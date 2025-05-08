import * as v from 'valibot';
import { valid } from 'semver';

const semver = v.custom<string>(
  (value) => {
    return typeof value === 'string' && Boolean(valid(value));
  },
  (value) => `Invalid Semantic Versioning, received ${value.received}`,
);

const stringInt = v.pipe(
	v.unknown(),
	v.transform((value) => Number.isSafeInteger(value)),
);

export const schema = v.object({
  VITE_SITE_NAME: v.string(),
  VITE_WORDPRESS_VERSION: semver,
  VITE_ARTIFICIAL_DELAY: stringInt,
  VITE_HIDE_ROBOTS: v.union([v.literal('true'), v.literal('false')]),
});
