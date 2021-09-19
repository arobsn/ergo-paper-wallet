import * as bip32 from "bip32";
import * as consts from "@/utils/constants";
import * as bs58check from "bs58check";
import { Address } from "@coinbarn/ergo-ts";
import { walletChecksum, WalletChecksum } from "@emurgo/cip4-js";

export default class Seed {
  private _change!: bip32.BIP32Interface;
  private _index!: bip32.BIP32Interface;

  private _pk!: Buffer;

  constructor(buffer: Buffer) {
    this._change = bip32.fromSeed(buffer).derivePath(consts.derivationPath);
    this._index = this._change.derive(0);
  }

  public get address(): string {
    return Address.fromPk(this._index.publicKey.toString("hex")).address;
  }

  public get currentBip32(): bip32.BIP32Interface {
    return this._index;
  }

  public get extendedPublicKey(): string {
    if (!this._pk) {
      this._pk = bs58check.decode(this._change.neutered().toBase58());
    }
    return this._pk.toString("hex");
  }

  public get checksum(): WalletChecksum {
    // The parent fingerprint and index fields need to be
    // removed to get the same result as Yoroi.
    const pk = this.removeParentFingerphintAndIndex(Buffer.from(this._pk));
    return walletChecksum(pk.toString("hex"));
  }

  private removeParentFingerphintAndIndex(key: Buffer) {
    return key.fill(0, 4, 12);
  }

  public derive(index: number): Seed {
    this._index = this._change.derive(index);
    return this;
  }
}
