# codeit-fs

Codeit fullstack course repositories collected for public sharing.

## Contents

- `codeit-fs-09`: Fullstack course repositories from the 09 cohort/material set.
- `codeit-fs-11`: Fullstack course repositories from the 11 cohort/material set.

## Public Repository Notes

This repository is prepared for public release.

Before publishing, sensitive local-only files were removed or replaced with key-only example files:

- Private key files such as `*.pem` were removed.
- Real `.env` files were removed.
- `Pulumi.dev.yaml` stack config files were removed.
- `.DS_Store` files were removed.
- Environment examples keep variable names only and leave values empty.

For local development, copy an example file and fill in values on your machine:

```bash
cp .env.example .env
```

Do not commit real secrets, service credentials, private keys, local database URLs, OAuth client secrets, or personal access tokens.

## Repository Structure Note

The folders under `codeit-fs-09` and `codeit-fs-11` were originally separate Git repositories. If this directory is published as one combined repository, make sure the intended source files are added to the new repository rather than accidentally publishing only nested Git repository links.
