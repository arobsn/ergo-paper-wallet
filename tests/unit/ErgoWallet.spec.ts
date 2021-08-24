import * as bip39 from "bip39";
import Mnemonic from "@/utils/ergo/mnemonic";
import Seed from "@/utils/ergo/seed";

describe("mnemonics generation", () => {
  it("generates valid mnemonic", () => {
    var mnemonic = new Mnemonic();
    expect(bip39.validateMnemonic(mnemonic.toString())).toBe(true);
  });

  it("fails when trying to ganerate a wallet with invalid mnemonic", () => {
    var invalidMnemonic =
      "author tell knee alert group smooth pepper better mistake ranch ecology reveal rent resource daring";
    expect(() => {
      new Mnemonic(invalidMnemonic);
    }).toThrow();
  });
});

describe("address generation", () => {
  let seed!: Seed;
  beforeAll(async () => {
    let wallet = new Mnemonic(
      "this usage buyer light oak sponsor marriage oil clay text found pupil swear glad meat"
    );
    seed = await wallet.toSeed().then((seed) => {
      return seed;
    });
  });

  it("generates extended puplic key", () => {
    let xpkFromYoroi =
      "0488b21e04cc30ffed00000000478725d7ce9c7c4bb58522d076cb6bfc975dd6d9b9c743934eab4060d23f87aa03c908a8378b80660be33ff2a5035d324e700bfdd43e251ab88cc5e3be176d9ea9";
    expect(seed.extendedPublicKey).toEqual(xpkFromYoroi);
  });

  it("derive addresses", () => {
    let validAddresses = [
      "9em69dLVG6UoKzjDhKoYUHAWs1NM4vm928LQU6wrMsX1RQYNRpx",
      "9gLs82Lp34QWjBApeF8UnXkQoXaaznBRHpUJwnxfjtXjT6rKV67",
      "9eaGjRXeVCjvJbazhLASv5RQnj8VU11kefQJw7CPb4pLnTfPiGk",
      "9hYpHyBdjMpodpRG8fjeR7WbPToazQvdU51bvmhf4JWZun3ciqM",
      "9f4uBr74jiPLXi76PKPDscFdznSzgkwxzUP1g3xMFwb2s3hSeVp",
      "9gPMoumWJT8u1T9SzjWjxDUPrpY3egALYWUzhBJTKoku983LUV4",
      "9fRRTY8LsrNWvMnd25veDukjGHZjQQnr7XEBw5nA6fEDmArHqcC",
      "9gwmv7vMNTNBqJ3M6THYPegChwdaiHXzs4qdj7kT4NiJJKCaRGN",
      "9egRTgHFUqa44rrhcMM8UxU9TxHq5CcKrsPn6Qtu1KU5wfK84kx",
      "9f6yNnBxK2XcDriDJ1SKEahUTSmTcDcPEuXci8rsF6pY9QaWCpD",
      "9emrK8Tcxtvwr2yJWmtsgYYj4eqHppQGZynwskxk64ifiKEws1Y",
      "9hZuNm8W88dDtyXjGoq15senfeeCHudNJDk2qCT8jNpkaQMrmgt",
      "9goBCe8wwXKh3sKMYejoibGGkGZG9sbWg6QNTotDGFDomFVgdHD",
      "9iEWdq294G5bNASdVit3Sx7B1zVpxq9XvMSFpk6JJuoX5e4QQHp",
      "9fucgWQHpSHNP142Lr41CffzeccwicTRktGftD2TjnXbE6q5JA4",
      "9i8iDRBTWqQK5nUTLjcP7MYWYDaEBHcF34BE9WZRJt22RcdB3ME",
      "9eb2H82LXmynVVV21HGa1hkFWgQBxEnyG1dSkfZAjsusW1GRHCM",
      "9eiufa6XKUSudEsuboUMMjVu6s5fRo8TBW8kD1JSW1i46RxjzsD",
      "9iQFcubHNsXbEtCiZBjQ4usdcR1MzsabR9YuNLu1mvpTFqAqT3H",
      "9hkfwGCnaNKzrvfEd2po4wK6xa3TuhqQqdug6reHt2RrwdjCoge",
    ];

    for (let i = 0; i < validAddresses.length; i++) {
      seed = seed.derive(i);
      expect(seed.address).toEqual(validAddresses[i]);
    }
  });
});
