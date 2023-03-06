// @ts-check
import { CurationInterface } from "../proxy";
import { Config, Tx } from "../types";
import {
  CreateGalleryArgs,
  CreateCurationOfferArgs,
  ReplyCurationOfferArgs,
  BuyExhibitArgs,
  ListExhibitArgs,
  CancelExhibitArgs,
  RedeemExhibitArgs,
  CancelCurationOfferArgs,
  ListOwnedExhibitArgs,
} from "../types/curation";

export class Curation implements CurationInterface {
  readonly config: Config;
  readonly handle: string;

  constructor(config: Config) {
    this.config = config;
    this.handle = `${this.config.addresses["curation"]}::curation`;
  }

  //curator.create_gallery
  createGallery(args: CreateGalleryArgs): Promise<Tx> {
    const payload = {
      type: "entry_function_payload",
      function: `${this.handle}::create_gallery`,
      type_arguments: [],
      arguments: [
        args.name,
        args.spaceType,
        args.metadataUri,
        args.payees || [],
        args.commissionRates || [],
      ],
    };
    return this.config?.submitTx!(payload);
  }

  // curator.create_offer
  createCurationOffer(args: CreateCurationOfferArgs): Promise<Tx> {
    const payload = {
      type: "entry_function_payload",
      function: `${this.handle}::send_offer`,
      type_arguments: [],
      arguments: [
        args.tokenOwner,
        args.tokenCreator,
        args.collectionName,
        args.tokenName,
        args.tokenPropertyVersion,
        args.galleryId,
        args.price,
        args.offerDuration.toString(),
        args.exhibitExpiredAt.toString(),
        args.url,
        args.additionalInfo,
      ],
    };
    return this.config?.submitTx!(payload);
  }

  // invitee.reply_offer
  replyCurationOffer(args: ReplyCurationOfferArgs): Promise<Tx> {
    const payload = {
      type: "entry_function_payload",
      function: `${this.handle}::reply_offer`,
      type_arguments: ["0x1::aptos_coin::AptosCoin"],
      arguments: [args.offerId, args.reply],
    };
    return this.config?.submitTx!(payload);
  }

  // curator.cancel_offer
  cancelCurationOffer(args: CancelCurationOfferArgs): Promise<Tx> {
    const payload = {
      type: "entry_function_payload",
      function: `${this.handle}::cancel_offer`,
      type_arguments: [],
      arguments: [args.offerId],
    };
    return this.config?.submitTx!(payload);
  }

  // visitor.buy_exhibit
  buyExhibit(args: BuyExhibitArgs): Promise<Tx> {
    const payload = {
      type: "entry_function_payload",
      function: `${this.handle}::buy`,
      type_arguments: [args.coinType || "0x1::aptos_coin::AptosCoin"],
      arguments: [args.galleryId, args.exhibitId],
    };
    return this.config?.submitTx!(payload);
  }

  // curator.list_exhibit
  listExhibit(args: ListExhibitArgs): Promise<Tx> {
    const payload = {
      type: "entry_function_payload",
      function: `${this.handle}::list`,
      type_arguments: [args.coinType || "0x1::aptos_coin::AptosCoin"],
      arguments: [args.galleryId, args.exhibitId, args.additionalInfo],
    };
    return this.config?.submitTx!(payload);
  }

  // curator.list_owned_exhibit
  listOwnedExhibit(args: ListOwnedExhibitArgs): Promise<Tx> {
    const payload = {
      type: "entry_function_payload",
      function: `${this.handle}::list_owned`,
      type_arguments: [args.coinType || "0x1::aptos_coin::AptosCoin"],
      arguments: [
        args.galleryId,
        args.creator,
        args.collectionIdentifier,
        args.tokenIdentifier,
        args.propertyVersion,
        args.price,
        args.location,
      ],
    };
    return this.config?.submitTx!(payload);
  }

  // curator.cancel_exhibit
  cancelExhibit(args: CancelExhibitArgs): Promise<Tx> {
    const payload = {
      type: "entry_function_payload",
      function: `${this.handle}::cancel`,
      type_arguments: [args.coinType || "0x1::aptos_coin::AptosCoin"],
      arguments: [args.galleryId, args.exhibitId],
    };
    return this.config?.submitTx!(payload);
  }

  // nft_owner.redeem
  redeemExhibit(args: RedeemExhibitArgs): Promise<Tx> {
    const payload = {
      type: "entry_function_payload",
      function: `${this.handle}::redeem_with_freeze`,
      type_arguments: [args.coinType || "0x1::aptos_coin::AptosCoin"],
      arguments: [args.galleryId, args.exhibitId],
    };
    return this.config?.submitTx!(payload);
  }
}
