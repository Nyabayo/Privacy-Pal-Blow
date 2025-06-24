import { Actor, HttpAgent } from "@dfinity/agent";
import { idlFactory as backendIdl, canisterId as backendCanisterId } from "../declarations/backend";
import { idlFactory as blowStorageIdl, canisterId as blowStorageCanisterId } from "../declarations/blow_storage";

const host = process.env.DFX_NETWORK === "ic" ? "https://icp-api.io" : "http://localhost:8000";
const agent = new HttpAgent({ host });

// For local development, fetch root key
if (process.env.DFX_NETWORK !== "ic") {
  agent.fetchRootKey().catch(err => {
    console.warn("Unable to fetch root key. Check to ensure that your local replica is running");
    console.error(err);
  });
}

export const backend = Actor.createActor(backendIdl, {
  agent,
  canisterId: backendCanisterId,
});

export const blowStorage = Actor.createActor(blowStorageIdl, {
  agent,
  canisterId: blowStorageCanisterId,
}); 