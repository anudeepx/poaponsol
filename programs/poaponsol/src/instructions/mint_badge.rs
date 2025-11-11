use anchor_lang::prelude::*;
use mpl_core::{
    instructions::CreateV2CpiBuilder,
    types::{
        Attribute, Attributes, BurnDelegate, FreezeDelegate, Plugin,
        PluginAuthority, PluginAuthorityPair,
    },
    ID as CORE_PROGRAM_ID,
};

use crate::{
    errors::PoapError,
    state::{collection_authority::CollectionAuthority, event::Event},
    constants::COLLECTION_AUTHORITY_SEED,
};

#[derive(Accounts)]
pub struct MintBadge<'info> {
    #[account(mut)]
    pub claimer: Signer<'info>,

    #[account(
        mut,
        constraint = badge_mint.data_is_empty() @ PoapError::AssetAlreadyInitialized
    )]
    pub badge_mint: Signer<'info>,

    #[account(
        mut,
        constraint = event.is_active @ PoapError::EventNotActive
    )]
    pub event: Account<'info, Event>,

    /// The collection NFT mint (must belong to Metaplex Core)
    #[account(
        mut,
        constraint = collection.owner == &CORE_PROGRAM_ID @ PoapError::InvalidCollection,
        constraint = !collection.data_is_empty() @ PoapError::CollectionNotInitialized
    )]
    /// CHECK: validated via core
    pub collection: UncheckedAccount<'info>,

    #[account(
        seeds = [COLLECTION_AUTHORITY_SEED, collection.key().as_ref()],
        bump = collection_authority.bump,
    )]
    pub collection_authority: Account<'info, CollectionAuthority>,

    #[account(address = CORE_PROGRAM_ID)]
    /// CHECK: verified by core CPI
    pub core_program: UncheckedAccount<'info>,

    pub system_program: Program<'info, System>,
}

impl<'info> MintBadge<'info> {
    pub fn handler(ctx: Context<Self>) -> Result<()> {
        let claimer = &ctx.accounts.claimer;
        let badge_mint = &ctx.accounts.badge_mint;
        let collection = &ctx.accounts.collection;
        let collection_authority = &ctx.accounts.collection_authority;
        let core_program = &ctx.accounts.core_program;

        let signer_seeds: &[&[&[u8]]] = &[&[
            COLLECTION_AUTHORITY_SEED,
            &collection.key().to_bytes(),
            &[collection_authority.bump],
        ]];

        let timestamp = Clock::get()?.unix_timestamp;

        CreateV2CpiBuilder::new(&core_program.to_account_info())
            .asset(&badge_mint.to_account_info())
            .collection(Some(&collection.to_account_info()))
            .authority(Some(&collection_authority.to_account_info()))
            .payer(&claimer.to_account_info())
            .owner(Some(&claimer.to_account_info()))
            .update_authority(None)
            .system_program(&ctx.accounts.system_program.to_account_info())
            .name(collection_authority.nft_name.clone())
            .uri(collection_authority.nft_uri.clone())
            .plugins(vec![
                PluginAuthorityPair {
                    plugin: Plugin::Attributes(Attributes {
                        attribute_list: vec![
                            Attribute {
                                key: "Creator".to_string(),
                                value: collection_authority.creator.to_string(),
                            },
                            Attribute {
                                key: "Minter".to_string(),
                                value: claimer.key().to_string(),
                            },
                            Attribute {
                                key: "Collection".to_string(),
                                value: collection.key().to_string(),
                            },
                            Attribute {
                                key: "Mint Timestamp".to_string(),
                                value: timestamp.to_string(),
                            },
                        ],
                    }),
                    authority: None,
                },
                // Freeze Delegate - collection authority can freeze
                PluginAuthorityPair {
                    plugin: Plugin::FreezeDelegate(FreezeDelegate { frozen: true }),
                    authority: Some(PluginAuthority::Address {
                        address: collection_authority.key(),
                    }),
                },
                // Burn Delegate - collection authority can burn if needed
                PluginAuthorityPair {
                    plugin: Plugin::BurnDelegate(BurnDelegate {}),
                    authority: Some(PluginAuthority::Address {
                        address: collection_authority.key(),
                    }),
                },
            ])
            .external_plugin_adapters(vec![])
            .invoke_signed(signer_seeds)?;

        Ok(())
    }
}
