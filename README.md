# POAPonSOLANA

[architecture link](https://excalidraw.com/#json=UpfKw6Cwza4H4gW4C6RBk,supzxzdXYx0j1HP2GL4Epw)

## deployment logs

```bash 
avula@AsusVivobook16x:~/poaponsol$ anchor deploy --provider.cluster devnet
Deploying cluster: https://api.devnet.solana.com
Upgrade authority: /home/avula/.config/solana/id.json
Deploying program "poaponsol"...
Program path: /home/avula/poaponsol/target/deploy/poaponsol.so...
Program Id: DzqHpVGTsTumRwUBSgv16PKStMA7xK3XhXwTNB921B6r

Signature: 5jEEh6pDKJHwDiqSdPw7GZWXTvHaXt1YBes85f2o7oQbZ9KhHLBMraGf26V9AK6tS2gNW15K1gCbQdddnx1c5TnV

Waiting for program DzqHpVGTsTumRwUBSgv16PKStMA7xK3XhXwTNB921B6r to be confirmed...
Program confirmed on-chain
Idl data length: 1069 bytes
Step 0/1069 
Step 600/1069 
Idl account created: HxfApq92znBg7cXTWYL47B6sKg54wyddpQtY2yMUNUFW
Deploy success

avula@AsusVivobook16x:~/poaponsol$ solana program show DzqHpVGTsTumRwUBSgv16PKStMA7xK3XhXwTNB921B6r

Program Id: DzqHpVGTsTumRwUBSgv16PKStMA7xK3XhXwTNB921B6r
Owner: BPFLoaderUpgradeab1e11111111111111111111111
ProgramData Address: DMufzBtpEzSBT78VsuejpBDVwVmjYWbCf11jaaPMeiKE
Authority: 2SZyg3ZgvmpE2FkqKnhtyz5xj4twnVcv8vaDyrVJszuv
Last Deployed In Slot: 421014641
Data Length: 318600 (0x4dc88) bytes
Balance: 2.21866008 SOL
```