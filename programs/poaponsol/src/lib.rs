use anchor_lang::prelude::*;

pub mod instructions;
pub mod state;
pub mod constants;
pub mod errors;
// pub mod events;

use instructions::create_event::*;
pub use state::*;
pub use constants::*;
pub use errors::*;
// pub use events::*;


declare_id!("DzqHpVGTsTumRwUBSgv16PKStMA7xK3XhXwTNB921B6r");

#[program]
pub mod poaponsol {
    use super::*;

    pub fn create_event(ctx: Context<CreateEvent>, args: CreateEventArgs) -> Result<()> {
        instructions::create_event::create_event(ctx, args)
    }

    pub fn mint_badge(ctx: Context<MintBadge>) -> Result<()> {
        mint_badge::handler(ctx)
    }

     pub fn close_event(ctx: Context<CloseEvent>) -> Result<()> {
        close_event::handler(ctx)
    }
}
