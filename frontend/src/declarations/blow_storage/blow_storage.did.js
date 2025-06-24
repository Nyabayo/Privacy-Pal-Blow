export const idlFactory = ({ IDL }) => {
  const BlowId = IDL.Nat;
  const File = IDL.Record({
    'contentType' : IDL.Text,
    'data' : IDL.Vec(IDL.Nat8),
    'name' : IDL.Text,
  });
  const Tag = IDL.Text;
  const Blow = IDL.Record({
    'id' : BlowId,
    'files' : IDL.Vec(File),
    'tags' : IDL.Vec(Tag),
    'trustScore' : IDL.Opt(IDL.Nat),
    'description' : IDL.Text,
    'timestamp' : IDL.Nat64,
  });
  return IDL.Service({
    'generate_tags_llm' : IDL.Func([IDL.Text], [IDL.Vec(IDL.Text)], []),
    'get_blow' : IDL.Func([BlowId], [IDL.Opt(Blow)], ['query']),
    'get_blows' : IDL.Func([], [IDL.Vec(Blow)], ['query']),
    'set_trust_score' : IDL.Func([BlowId, IDL.Nat], [IDL.Bool], []),
    'submit_blow' : IDL.Func(
        [IDL.Text, IDL.Vec(File), IDL.Vec(Tag)],
        [BlowId],
        [],
      ),
    'trust_score_llm' : IDL.Func([IDL.Text, IDL.Vec(IDL.Text)], [IDL.Nat], []),
  });
};
export const init = ({ IDL }) => { return []; };
