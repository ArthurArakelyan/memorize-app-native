import Field from "../types/Field";

const addMemoryFields: Field[] = [
  {
    name: 'title',
    label: 'Title',
    validators: [
      {
        required: true,
        message: 'Title is required',
      },
      {
        max: 256,
        message: 'Title can\'t contain more than 256 symbols',
      },
    ],
  },
  {
    name: 'description',
    label: 'Description',
    validators: [
      {
        max: 1024,
        message: 'Description can\'t contain more than 1024 symbols',
      },
    ],
  },
];

export default addMemoryFields;
