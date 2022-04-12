import type { CMSList } from './CMSList';

export interface CMSFilters {
  /**
   * Defines the `Form Block` element that hold all filters.
   */
  readonly formBlock: HTMLDivElement;

  /**
   * Defines a {@link CMSList} instance. See `cmscore` docs for more info.
   */
  readonly listInstance: CMSList;

  /**
   * The <form> element that holds all filters.
   */
  readonly form: HTMLFormElement;

  /**
   * An element where the amount of matching results is displayed.
   */
  readonly resultsElement: HTMLElement;

  /**
   * Stores the fields that each reset button has control of.
   */
  readonly resetButtonsData: Map<HTMLElement, string[]>;

  /**
   * A `<input type="submit">` button.
   */
  readonly submitButton?: HTMLInputElement;

  /**
   * The filters data.
   */
  filtersData: FilterData[];

  /**
   * Defines if any filter is currently active.
   */
  filtersActive?: boolean;

  /**
   * Defines if the submit button is visible.
   */
  submitButtonVisible: boolean;

  /**
   * Defines if the filters query must be printed in the Address bar.
   */
  readonly showQueryParams: boolean;

  /**
   * Defines the global active CSS class to apply on active filters.
   */
  readonly activeCSSClass: string;

  /**
   * Defines the global debouncing to apply to all filters.
   */
  readonly debouncing: number;

  /**
   * Defines if all results should be highlighted.
   */
  readonly highlightAll: boolean;

  /**
   * Defines the global highlight CSS class to appy on highlighted elements.
   */
  readonly highlightCSSClass: string;

  /**
   * Stores the data of all filters.
   * @returns The stored {@link FiltersData}.
   */
  storeFiltersData(): FilterData[];

  /**
   * Mutates each `CMSItem`'s state to define if it should be displayed or not.
   *
   * @param addingItems Defines if new items are being added.
   * In that case, the rendering responsibilities are handled by another controller.
   *
   * @param syncTags Defines if the {@link CMSTags} instance should be syncronized. Defaults to `true`.
   */
  applyFilters(addingItems?: boolean, syncTags?: boolean): Promise<void>;

  /**
   * Resets the active filters.
   * @param filterKey If passed, only this filter key will be resetted.
   * @param value If passed, only that specific value and the elements that hold it will be cleared.
   */
  resetFilters(filterKeys?: string[], value?: string): Promise<void>;
}

interface FilterData {
  /**
   * The elements that filter by the `filterKeys` of this filter.
   */
  elements: FilterElement[];

  /**
   * The `filterKey` indentifiers.
   */
  originalFilterKeys: string[];

  /**
   * The normalized `filterKey` indentifiers.
   */
  filterKeys: string[];

  /**
   * The current active values.
   */
  values: Set<string>;

  /**
   * The matching rule.
   */
  match?: 'any' | 'all';

  /**
   * A specific filtering mode.
   */
  mode?: 'range';

  /**
   * Defines if matching `CMSItemProps` should be highlighted.
   */
  highlight: boolean;

  /**
   * Defines the Highlight CSS Class to add to highlight targets.
   */
  highlightCSSClass: string;

  /**
   * Defines an override for the tag format of the filter.
   */
  tagFormat?: 'category';

  /**
   * Defines an override for the identifier display in the `category` tag format.
   */
  tagCategory: string | null;
}

/**
 * Filters
 */
interface FilterElement {
  /**
   * Defines the element that holds the filter value.
   */
  element: HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement;

  /**
   * The filter value.
   */
  value: string;

  /**
   * The Form Field type of the element.
   */
  type: string;

  /**
   * The amount of results for this particular element.
   */
  resultsCount: number;

  /**
   * An text element where to display the `resultsCount`.
   */
  resultsElement?: HTMLElement | null;

  /**
   * Defines if the element should be hidden when there are no `resultsCount`.
   */
  hideEmpty?: HTMLElement;

  /**
   * Defines if the element is currently hidden.
   */
  hidden: boolean;

  /**
   * Defines a filtering mode for the element's properties.
   */
  mode?: 'from' | 'to';

  /**
   * Defines the Active CSS Class to add when the element is active.
   */
  activeCSSClass: string;

  /**
   * Defines the debouncing for this specific element.
   */
  debouncing: number;
}
