use anchor_lang::prelude::*;
use mpl_core::{instructions::CreateCollectionV2CpiBuilder, ID as CORE_PROGRAM_ID};

use crate::{
    constants::EVENT_SEED,
    state::event::Event
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
#[instruction(args: CreateEventArgs)]
pub struct CreateEvent<'info> {
    #[account(mut)]
    pub organizer: Signer<'info>,

    #[account(
        init,
        payer = organizer,
        space = Event::LEN,
        seeds = [EVENT_SEED, organizer.key().as_ref(), args.name.as_bytes()],
        bump
    )]
    pub event: Account<'info, Event>,

    #[account(mut)]
    pub collection: Signer<'info>,

    /// CHECK: This account is validated by Metaplex Core CPI
    #[account(address = CORE_PROGRAM_ID)]
    pub core_program: UncheckedAccount<'info>,
    pub system_program: Program<'info, System>,
}

impl<'info> CreateEvent<'info> {
    pub fn handler(ctx: Context<Self>, args: CreateEventArgs, bumps: &CreateEventBumps) -> Result<()> {
        let event = &mut ctx.accounts.event;
        let organizer = &ctx.accounts.organizer;
        let collection = &ctx.accounts.collection;
        let core_program = &ctx.accounts.core_program;

        let signer_seeds: &[&[&[u8]]] = &[&[
            EVENT_SEED,
            organizer.key.as_ref(),
            args.name.as_bytes(),
            &[bumps.event],
        ]];

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
