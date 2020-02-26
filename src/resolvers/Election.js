const { addFragmentToInfo } = require('graphql-binding');

const Election = {
  races(parent, args, ctx, info) {
    const fragment = `fragment Result on Ballot { id }`;
    return ctx.db.query.ballots({}, addFragmentToInfo(info, fragment));
  }
};

module.exports = Election;
