# Polygraph web app

**`polygraph` is a web app for visualizing complex interpersonal
relationship structures.

The human structures of collaboration are documented in the [project
wiki].

Technical goals are stashed in the [project issues].

[project wiki]: https://github.com/epilanthanomai/polygraph/wiki)
[project issues]: https://github.com/epilanthanomai/polygraph/issues)

## Development practices

[![Build Status](https://travis-ci.org/epilanthanomai/polygraph.svg?branch=develop)](https://travis-ci.org/epilanthanomai/polygraph)

We follow the [git-flow branching model]. The main development integration
branch is `develop`. Features branches use prefix `feature/`. Release
branches use prefix `release/`. Hotfix branches use prefix `hotfix/`. Tagged
releases use [semantic versioning].

We try to commit and push changes frequently. We prefer to avoid rebasing or
rewriting commits that have been pushed to github. New code should have
strong test coverage and must pass all tests before we merge it to
`develop`. We prefer to fix existing bugs before we develop features with
new ones.

We like clear communication and information-linking. We try to write
[helpful commit messages] and [link everything], from project code and
issues to documentation.

There's always room for improvement.

[git-flow branching model]: http://jeffkreeftmeijer.com/2010/why-arent-you-using-git-flow/
[semantic versioning]: http://semver.org/
[helpful commit messages]: http://chris.beams.io/posts/git-commit/
[link everything]: https://guides.github.com/features/mastering-markdown/
