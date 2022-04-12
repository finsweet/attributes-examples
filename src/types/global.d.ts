import type { CMSFilters } from './CMSFilters';
import type { CMSList } from './CMSList';

/**
 * Window object.
 */
declare global {
  interface Window {
    fsAttributes: FsAttributes;
    FsAttributes: FsAttributes;
  }
}

type FsAttributesCallback =
  | [
      'cmsload' | 'cmsnest' | 'cmscombine' | 'cmsprevnext' | 'cmsslider' | 'cmssort' | 'cmstabs',
      (value: CMSList[]) => void
    ]
  | ['cmsfilter', (value: CMSFilters[]) => void];

type FsAttributesBase = {
  push: (...args: FsAttributesCallback[]) => void;

  cms: {
    coreVersion?: string;
    listElements?: HTMLDivElement[];
    listInstances?: CMSList[];
    filtersInstances?: CMSFilters[];
  };
};

interface FsAttributeInit<T = unknown> {
  version?: string;
  init?: () => T | Promise<T>;
  loading?: Promise<T>;
  resolve?: (value: T) => void;
}

type FsAttributesInit = {
  [key: string]: FsAttributeInit;
};

type FsAttributes = FsAttributesBase & FsAttributesInit;
