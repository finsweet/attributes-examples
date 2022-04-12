export interface CMSList {
  /**
   * The `Collection List Wrapper` element.
   */
  wrapper: HTMLDivElement;

  /**
   * The `Collection List` element.
   */
  list?: HTMLDivElement | null;

  /**
   * The `Pagination` wrapper element.
   */
  paginationWrapper?: HTMLDivElement | null;

  /**
   * The `Page Count` element.
   */
  paginationCount?: HTMLDivElement | null;

  /**
   * The `Previous` button.
   */
  paginationPrevious?: HTMLAnchorElement | null;

  /**
   * The `Next` button.
   */
  paginationNext?: HTMLAnchorElement | null;

  /**
   * An element used as scroll anchor.
   */
  scrollAnchor?: HTMLElement;

  /**
   * An element that displays the total amount of items in the list.
   */
  itemsCount?: HTMLElement;

  /**
   * An element that displays the amount of visible items.
   */
  visibleCount?: HTMLElement;

  /**
   * A custom `Initial State` element.
   */
  initialElement?: HTMLElement | null;

  /**
   * A custom `Empty State` element.
   */
  emptyElement?: HTMLElement | null;

  /**
   * Defines if the `Empty State` is currently active (no valid elements to show).
   */
  emptyState: boolean;

  /**
   * A custom loader element.
   */
  loader?: HTMLElement;

  /**
   * Defines the total amount of pages in the list.
   */
  totalPages: number;

  /**
   * Defines if rendered items should be paginated.
   */
  paginationActive: boolean;

  /**
   * Defines the current page in `Pagination` mode.
   */
  currentPage?: number;

  /**
   * Defines the query key for the paginated pages.
   * @example '5f7457b3_page'
   */
  pagesQuery?: string;

  /**
   * Defines if the pagination query param should be added to the URL when switching pages.
   * @example '?5f7457b3_page=1'
   */
  showPaginationQuery: boolean;

  /**
   * An array holding all {@link CMSItem} instances of the list.
   */
  items: CMSItem[];

  /**
   * An array holding all unsorted {@link CMSItem} instances of the list.
   */
  originalItemsOrder: CMSItem[];

  /**
   * Defines the amount of items per page.
   */
  itemsPerPage: number;

  /**
   * Defines the amount of items per page.
   */
  originalItemsPerPage: number;

  /**
   * An array holding all valid {@link CMSItem} instances of the list.
   * Items are set to valid/invalid by `cmsfilter` when performing any filter query.
   */
  validItems: CMSItem[];

  /**
   * Defines if the entire `window.Webflow` instance must be restarted when rendering items.
   * If set, individual modules ('ix2', 'commerce', 'lightbox') will also be restarted.
   */
  restartWebflow: false;

  /**
   * Defines if the Webflow `ix2` module must be restarted when rendering items.
   */
  restartIx: false;

  /**
   * Defines if the Webflow `commerce` module must be restarted when rendering items.
   */
  restartCommerce: false;

  /**
   * Defines if the Webflow `lightbox` module must be restarted when rendering items.
   */
  restartLightbox: false;

  /**
   * Defines if the Webflow `slider` module must be restarted when rendering items.
   */
  restartSliders: false;

  /**
   * Defines if the Webflow `tabs` module must be restarted when rendering items.
   */
  restartTabs: false;

  /**
   * Stores new Collection Items in the instance.
   *
   * @param itemElements The new `Collection Item` elements to store.
   * @param method Defines the storing method:
   *
   * - `unshift`: New items are added to the beginning of the store.
   * - `push`: New items are added to the end of the store.
   *
   * Defaults to `push`.
   */
  addItems(itemElements: HTMLElement[], method?: 'unshift' | 'push'): Promise<void>;

  /**
   * Restores the original items order.
   */
  restoreItemsOrder(): void;

  /**
   * Clears all stored {@link CMSItem} instances from the list.
   *
   * @param removeElements Defines if the {@link CMSItem.element} nodes should be removed from the DOM.
   * Defaults to `true`.
   */
  clearItems(removeElements?: boolean): void;

  /**
   * Recalculates the list object model based on the current props of the items
   * and triggers de correspondent mutations.
   *
   * @param animateItems Defines if the rendered items should be animated.
   * @param animateList Defines if the list should be animated.
   *
   * @returns The rendered items.
   */
  renderItems(animateItems?: boolean, animateList?: boolean): Promise<CMSItem[]>;

  /**
   * Shows / hides the requested element.
   * If the `listAnimation` exists, it uses that animation.
   *
   * @param elementKey The element to show/hide.
   * @param show The action to perform, `true` to show, `false` to hide. Defaults to `true`.
   * @param animate Defines if the transition should be animated. Defaults to `true`.
   */
  displayElement(
    elementKey:
      | 'wrapper'
      | 'list'
      | 'emptyElement'
      | 'initialElement'
      | 'paginationNext'
      | 'paginationPrevious'
      | 'loader',
    show?: boolean,
    animate?: boolean
  ): Promise<void>;

  /**
   * Switches the current page.
   *
   * @param targetPage The target page to set.
   *
   * @param renderItems Defines if the list should be re-rendered.
   * If `false`, the rendering responsibilities should be handled by another controller.
   *
   * @returns An awaitable Promise that resolves after the list has re-rendered.
   */
  switchPage(targetPage: number, renderItems?: boolean): Promise<void>;

  /**
   * Scrolls to the anchor element of the list.
   */
  scrollToAnchor(): void;

  /**
   * @returns An attribute value, if exists on the `Collection List Wrapper` or the `Collection List`.
   * @param attributeKey The key of the attribute
   */
  getAttribute(attributeKey: string): string | null | undefined;

  /**
   * Gets the instance of the list for a specific attribute key.
   * @param key The attribute key. Example: `fs-cmsfilter-element`.
   *
   * @example 'fs-cmsfilter-element="list-2"' // Returns 2.
   */
  getInstanceIndex(key: string): number | undefined;
}

interface CMSItem {
  /**
   * The `Collection Item` element.
   */
  element: HTMLDivElement;

  /**
   * The `Collection List` parent element.
   */
  list: HTMLDivElement;

  /**
   * The element's current index in the rendered list.
   */
  currentIndex?: number;

  /**
   * The URL of the item's `Template Page`.
   */
  href?: string;

  /**
   * The item's properties.
   * Defined by {@link CMSItemProps}.
   */
  props: CMSItemProps;

  /**
   * Defines if the item is valid to be rendered.
   */
  valid: boolean;

  /**
   * Promise that fulfills when the item is rendered to the DOM.
   */
  rendering?: Promise<void>;

  /**
   * Promise that fulfills when the item's render animation is fully finished.
   */
  animating?: Promise<void>;

  /**
   * Defines if the item needs a Webflow modules restart.
   */
  needsWebflowRestart: boolean;

  /**
   * Collects the props from child elements and stores them.
   * @param attributeKeys The attribute keys to use to collect the props.
   * @returns Nothing, it mutates the passed `CMSItem` instances.
   */
  collectProps({ fieldKey, typeKey, rangeKey }: { fieldKey: string; typeKey?: string; rangeKey?: string }): void;
}

interface CMSItemProps {
  [key: string]: {
    /**
     * Defines the prop values.
     */
    values: Set<string>;

    /**
     * Defines the elements that hold the prop values.
     * The Map is used as [propValue, data].
     */
    elements: Map<
      string,
      {
        /**
         * The prop element.
         */
        element: HTMLElement;

        /**
         * Stores the original outer HTML of the element before any mutations.
         */
        originalHTML: string;
      }
    >;

    /**
     * Defines filter values to highlight in a Map like:
     * ```
     * [propValue, data]
     * ```
     */
    highlightData?: Map<string, { filterValue?: string; highlightCSSClass: string }>;

    /**
     * Defines the type of the value.
     * @example `date`
     */
    type?: string | null;

    /**
     * Defines the mode of the prop.
     * @example `from` | `to`.
     */
    range?: string | null;
  };
}
