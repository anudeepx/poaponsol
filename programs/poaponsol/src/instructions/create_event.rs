use anchor_lang::prelude::*;
use mpl_core::{instructions::CreateCollectionV2CpiBuilder, ID as CORE_PROGRAM_ID};

use crate::{
    constants::{COLLECTION_AUTHORITY_SEED, EVENT_SEED, PROFILE_SEED},
    state::event::Event,
    state::CollectionAuthority,
    state::OrganizerProfile,
};

#[derive(AnchorSerialize, AnchorDeserialize, Clone)]
pub struct CreateEventArgs {
    pub name: String,
    pub uri: String,
    pub start_timestamp: i64,
    pub end_timestamp: i64,
    pub max_claims: u32,
}

#[derive(Accounts)]
pub struct CreateEvent<'info> {
    #[account(mut)]
    pub organizer: Signer<'info>,

    #[account(
        init_if_needed,
        payer = organizer,
        space = OrganizerProfile::LEN,
        seeds = [PROFILE_SEED, organizer.key().as_ref()],
        bump,
        constraint = profile.organizer == organizer.key() || profile.organizer == Pubkey::default(),
    )]
    pub profile: Account<'info, OrganizerProfile>,

    #[account(
        init,
        payer = organizer,
        space = Event::LEN,
        seeds = [
            EVENT_SEED,
            organizer.key().as_ref(),
            &profile.event_count.to_le_bytes(),
        ],
        bump
    )]
    pub event: Account<'info, Event>,

    #[account(mut)]
    pub collection: Signer<'info>,
    #[account(
        init,
        payer = organizer,
        space = CollectionAuthority::INIT_SPACE,
        seeds = [COLLECTION_AUTHORITY_SEED, collection.key().as_ref()],
        bump,
    )]
    pub collection_authority: Account<'info, CollectionAuthority>,

    /// CHECK: Validated by Metaplex Core CPI
    #[account(address = CORE_PROGRAM_ID)]
    pub core_program: UncheckedAccount<'info>,

    pub system_program: Program<'info, System>,
}

impl<'info> CreateEvent<'info> {
    pub fn handler(ctx: Context<Self>, args: CreateEventArgs) -> Result<()> {
        let event = &mut ctx.accounts.event;
        let organizer = &ctx.accounts.organizer;
        let collection = &ctx.accounts.collection;
        let core_program = &ctx.accounts.core_program;
        let profile = &mut ctx.accounts.profile;
        let ca = &mut ctx.accounts.collection_authority;

        if profile.organizer == Pubkey::default() {
            profile.organizer = organizer.key();
        }

        let event_index = profile.event_count;
        profile.event_count += 1;

        let ca_bump = *ctx.bumps.get("collection_authority").unwrap();
        ca.set_inner(CollectionAuthority {
            bump: ca_bump,
            creator: organizer.key(),
            collection: collection.key(),
            nft_name: args.name.clone(),
            nft_uri: args.uri.clone(),
        });

        let bump = ctx.bumps.event;
        let signer_seeds: &[&[&[u8]]] = &[&[
            EVENT_SEED,
            organizer.key().as_ref(),
            &event_index.to_le_bytes(),
            &[bump],
        ]];

        let ca = &mut ctx.accounts.collection_authority;

        ca.set_inner(CollectionAuthority {
            bump,
            creator: organizer.key(),
            collection: collection.key(),
            nft_name: args.name.clone(),
            nft_uri: args.uri.clone(),
        });

        CreateCollectionV2CpiBuilder::new(&core_program.to_account_info())
            .collection(&collection.to_account_info())
            .payer(&organizer.to_account_info())
            .update_authority(Some(&organizer.to_account_info()))
            .system_program(&ctx.accounts.system_program.to_account_info())
            .name(args.name.clone())
            .uri(args.uri.clone())
            .plugins(vec![])
            .external_plugin_adapters(vec![])
            .invoke_signed(signer_seeds)?;

        event.set_inner(Event {
            name: args.name.clone(),
            organizer: organizer.key(),
            collection_mint: collection.key(),
            uri: args.uri.clone(),
            start_timestamp: args.start_timestamp,
            end_timestamp: args.end_timestamp,
            max_claims: args.max_claims,
            is_active: true,
        });

        Ok(())
    }
}
