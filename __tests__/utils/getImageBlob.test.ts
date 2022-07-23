import {it, expect, vi} from "vitest";

import getImageBlob from "../../src/utils/getImageBlob";

const invalidUrlError = 'Invalid URL';

class Blob {}

vi.stubGlobal('Blob', Blob);

vi.stubGlobal('fetch', (url: string) => {
  return new Promise((resolve, reject) => {
    if (!url) {
      reject(invalidUrlError);
    }

    resolve({
      blob: () => {
        return new Blob();
      }
    });
  });
});

it('should be instanceof Blob if provided url is valid', async () => {
  const url = 'https://www.google.com/favicon.ico';

  const blob = await getImageBlob(url);
  expect(blob).toBeInstanceOf(Blob);
});

it('should throw an error if provided url is not valid', async () => {
  const url = '';

  try {
    await getImageBlob(url);
  } catch (e) {
    expect(e).toBe(invalidUrlError);
  }
});
