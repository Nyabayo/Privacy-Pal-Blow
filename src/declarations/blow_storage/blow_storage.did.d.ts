import type { Principal } from '@dfinity/principal';
import type { ActorMethod } from '@dfinity/agent';
import type { IDL } from '@dfinity/candid';

export interface Blow {
  'id' : BlowId,
  'files' : Array<File>,
  'tags' : Array<Tag>,
  'trustScore' : [] | [bigint],
  'description' : string,
  'timestamp' : bigint,
}
export type BlowId = bigint;
export interface File {
  'contentType' : string,
  'data' : Uint8Array | number[],
  'name' : string,
}
export type Tag = string;
export interface _SERVICE {
  'generate_tags_llm' : ActorMethod<[string], Array<string>>,
  'get_blow' : ActorMethod<[BlowId], [] | [Blow]>,
  'get_blows' : ActorMethod<[], Array<Blow>>,
  'set_trust_score' : ActorMethod<[BlowId, bigint], boolean>,
  'submit_blow' : ActorMethod<[string, Array<File>, Array<Tag>], BlowId>,
  'trust_score_llm' : ActorMethod<[string, Array<string>], bigint>,
}
export declare const idlFactory: IDL.InterfaceFactory;
export declare const init: (args: { IDL: typeof IDL }) => IDL.Type[];
