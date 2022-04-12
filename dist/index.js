(() => {
  // src/cms/populate-external-data/index.ts
  window.fsAttributes = window.fsAttributes || [];
  window.fsAttributes.push([
    "cmsfilter",
    async (filtersInstances) => {
      const [filtersInstance] = filtersInstances;
      const { listInstance } = filtersInstance;
      const [firstItem] = listInstance.items;
      const itemTemplateElement = firstItem.element;
      const products = await fetchProducts();
      listInstance.clearItems();
      const newItems = products.map((product) => createItem(product, itemTemplateElement));
      await listInstance.addItems(newItems);
      const filterTemplateElement = filtersInstance.form.querySelector('[data-element="filter"]');
      if (!filterTemplateElement)
        return;
      const filtersWrapper = filterTemplateElement.parentElement;
      if (!filtersWrapper)
        return;
      filterTemplateElement.remove();
      const categories = collectCategories(products);
      for (const category of categories) {
        const newFilter = createFilter(category, filterTemplateElement);
        if (!newFilter)
          continue;
        filtersWrapper.append(newFilter);
      }
      filtersInstance.storeFiltersData();
    }
  ]);
  var fetchProducts = async () => {
    try {
      const response = await fetch("https://fakestoreapi.com/products");
      const data = await response.json();
      return data;
    } catch (error) {
      return [];
    }
  };
  var createItem = (product, templateElement) => {
    const newItem = templateElement.cloneNode(true);
    const image = newItem.querySelector('[data-element="image"]');
    const title = newItem.querySelector('[data-element="title"]');
    const category = newItem.querySelector('[data-element="category"]');
    const description = newItem.querySelector('[data-element="description"]');
    if (image)
      image.src = product.image;
    if (title)
      title.textContent = product.title;
    if (category)
      category.textContent = product.category;
    if (description)
      description.textContent = product.description;
    return newItem;
  };
  var collectCategories = (products) => {
    const categories = /* @__PURE__ */ new Set();
    for (const { category } of products) {
      categories.add(category);
    }
    return [...categories];
  };
  var createFilter = (category, templateElement) => {
    const newFilter = templateElement.cloneNode(true);
    const label = newFilter.querySelector("span");
    const radio = newFilter.querySelector("input");
    if (!label || !radio)
      return;
    label.textContent = category;
    radio.value = category;
    return newFilter;
  };
})();
