import * as bip32 from "bip32";
import * as consts from "@/utils/constants";
import * as bs58check from "bs58check";
import { Address } from "@coinbarn/ergo-ts";

export default class Seed {
  private _change!: bip32.BIP32Interface;
  private _index!: bip32.BIP32Interface;

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
    return bs58check.decode(this._change.neutered().toBase58()).toString("hex");
  }

  public derive(index: number): Seed {
    this._index = this._change.derive(index);
    return this;
  }
}
