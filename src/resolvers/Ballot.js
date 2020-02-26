const Ballot = {
  // Pattern borrowed from playbook:
  // https://www.prisma.io/tutorials/a-guide-to-common-resolver-patterns-ct08/#scenario:-add-a-custom/computed-field-to-a-prisma-model-via-the-application-schema-prisma-bindings
  async results({ id }, args, ctx, info) {
    const votes = await ctx.db.query.votes({ where: { ballot: { id } } }, info);

    const results = votes
      .reduce((accumulator, vote) => {
        let entryExists = false;

        // Does this entry exist in accumulator yet?
        const existingResults = accumulator.map(entry => {
          if (
            (vote.candidate === null && entry.candidate === null)
            || ((vote.candidate !== null && entry.candidate !== null) && entry.candidate.id === vote.candidate.id)
          ) {
            entry.count++;
            entryExists = true;
          }
          return entry;
        });

        return entryExists ?
          [...existingResults] :
          [
            ...accumulator,
            {
              count: 1,
              candidate: vote.candidate
            }
          ];
      }, []);

      return results.sort((a, b) => {
        if (a.count < b.count) {
          return 1;
        }
        if (a.count > b.count) {
          return -1;
        }
        return 0;
      });
      return results;
  },
};

module.exports = Ballot;
