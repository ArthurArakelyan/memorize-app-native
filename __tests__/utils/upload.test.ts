import {expect, it, beforeEach, vi} from "vitest";
import {Asset, ImageLibraryOptions, ImagePickerResponse} from "react-native-image-picker";

import upload from "../../src/utils/upload";

const permissionDeniedMessage = 'Permission Denied';
let imagePermission = true;

const createAsset = (): Asset => ({});

beforeEach(() => {
  imagePermission = true;
});

vi.mock('react-native-image-picker', () => {
  return {
    launchImageLibrary: (
      options: ImageLibraryOptions,
      callback?: (response: ImagePickerResponse) => void,
    ): Promise<ImagePickerResponse> => {
      return new Promise((resolve, reject) => {
        if (!imagePermission) {
          reject(permissionDeniedMessage);
        }

        const assets: Asset[] = [];
        const limit = options.selectionLimit ?? 1;

        for (let i = 0; i < limit; i++) {
          assets.push(createAsset());
        }

        const response: ImagePickerResponse = {
          assets,
        };

        callback && callback(response);

        resolve(response);
      });
    },
  };
});

it('should resolve image picker response if we have got permission to open image library', async () => {
  const asset = createAsset();

  const response = await upload();

  expect(response).toEqual(asset);
});

it('should throw a permission denied error if we have not got permission to open image library', async () => {
  imagePermission = false;

  try {
    await upload();
  } catch (e) {
    expect(e).toBe(permissionDeniedMessage);
  }
});
