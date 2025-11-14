use anchor_lang::prelude::*;

pub mod constants;
pub mod errors;
pub mod instructions;
pub mod state;

use crate::instructions::*;
pub use constants::*;
pub use errors::*;
pub use state::*;

declare_id!("DzqHpVGTsTumRwUBSgv16PKStMA7xK3XhXwTNB921B6r");

#[program]
pub mod poaponsol {
    use super::*;

    pub fn create_event(
        ctx: Context<CreateEvent>,
        args: create_event::CreateEventArgs,
    ) -> Result<()> {
        create_event::CreateEvent::handler(ctx, args)
    }
    pub fn mint_badge(ctx: Context<MintBadge>) -> Result<()> {
        MintBadge::handler(ctx)
    }

    pub fn close_event(ctx: Context<CloseEvent>) -> Result<()> {
        close_event::handler(ctx)
    }
}
