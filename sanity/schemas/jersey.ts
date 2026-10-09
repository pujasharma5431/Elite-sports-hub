/**
 * Sanity Schema Definition for "jersey"
 * Copy or import this schema into your Sanity Studio schema types
 */
export default {
  name: 'jersey',
  title: 'Jersey Product',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Jersey Title',
      type: 'string',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: [
          { title: 'Cricket', value: 'cricket' },
          { title: 'Football', value: 'football' },
          { title: 'Limited Edition', value: 'limited-edition' },
        ],
        layout: 'radio',
      },
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'sport',
      title: 'Sport Type',
      type: 'string',
      options: {
        list: [
          { title: 'Cricket', value: 'Cricket' },
          { title: 'Football', value: 'Football' },
        ],
      },
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'team',
      title: 'Team Name',
      type: 'string',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'player',
      title: 'Player Name',
      type: 'string',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'playerNumber',
      title: 'Player Jersey Number',
      type: 'number',
    },
    {
      name: 'edition',
      title: 'Edition / Season Tag',
      type: 'string',
    },
    {
      name: 'price',
      title: 'Price in Nepali Rupee (NPR / Rs.)',
      type: 'number',
      validation: (Rule: any) => Rule.required().positive(),
    },
    {
      name: 'originalPrice',
      title: 'Original Price (for Sale items)',
      type: 'number',
    },
    {
      name: 'isOnSale',
      title: 'Is this Jersey on Sale?',
      type: 'boolean',
      initialValue: false,
    },
    {
      name: 'isLimitedEdition',
      title: 'Is this a Limited Edition?',
      type: 'boolean',
      initialValue: false,
    },
    {
      name: 'limitedEditionNumber',
      title: 'Limited Edition Numbering / Notes (e.g. 1 of 500)',
      type: 'string',
    },
    {
      name: 'stock',
      title: 'Available Inventory / Stock Count',
      type: 'number',
      validation: (Rule: any) => Rule.required().min(0),
      initialValue: 10,
    },
    {
      name: 'isLowStock',
      title: 'Flag as Low Stock',
      type: 'boolean',
      initialValue: false,
    },
    {
      name: 'sizes',
      title: 'Available Sizes',
      type: 'array',
      of: [{ type: 'string' }],
      options: {
        list: [
          { title: 'XS', value: 'XS' },
          { title: 'S', value: 'S' },
          { title: 'M', value: 'M' },
          { title: 'L', value: 'L' },
          { title: 'XL', value: 'XL' },
          { title: 'XXL', value: 'XXL' },
          { title: '3XL', value: '3XL' },
        ],
      },
    },
    {
      name: 'gender',
      title: 'Target Fit / Gender',
      type: 'array',
      of: [{ type: 'string' }],
      options: {
        list: [
          { title: 'Men', value: 'men' },
          { title: 'Women', value: 'women' },
          { title: 'Unisex', value: 'unisex' },
          { title: 'Kids', value: 'kids' },
        ],
      },
    },
    {
      name: 'colors',
      title: 'Color Palette',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'name', title: 'Color Name', type: 'string' },
            { name: 'hex', title: 'Hex Code (e.g. #DC2626)', type: 'string' },
          ],
        },
      ],
    },
    {
      name: 'image',
      title: 'Primary Jersey Image',
      type: 'image',
      options: {
        hotspot: true,
      },
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'gallery',
      title: 'Additional Angle Photos',
      type: 'array',
      of: [{ type: 'image' }],
    },
    {
      name: 'fabric',
      title: 'Fabric & Material Tech',
      type: 'string',
    },
    {
      name: 'description',
      title: 'Description',
      type: 'text',
    },
    {
      name: 'nepalSpecial',
      title: 'Nepal Pride / Local Team Special',
      type: 'boolean',
      initialValue: false,
    },
    {
      name: 'rating',
      title: 'Customer Rating (1-5)',
      type: 'number',
      initialValue: 4.9,
    },
  ],
};
