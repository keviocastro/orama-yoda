import React from "react";
import {
  List,
  Datagrid,
  TextField,
  EditButton,
  Edit,
  SimpleForm,
  DisabledInput,
  TextInput,
  Create,
  ImageInput,
  ImageField
} from "admin-on-rest";

export const SegmentList = props => (
  <List {...props}>
    <Datagrid>
      <TextField source="id" />
      <TextField source="name" />
      <ImageField source="image.uri" />
      <EditButton />
    </Datagrid>
  </List>
);

export const SegmentEdit = props => (
  <Edit {...props}>
    <SimpleForm redirect="list">
      <DisabledInput source="id" />
      <TextInput source="name" />
      <ImageInput
        source="image"
        label="Image"
        accept="image/*"
        multiple={false}
      >
        <ImageField source="uri" title="name" />
      </ImageInput>
    </SimpleForm>
  </Edit>
);

export const SegmentCreate = props => (
  <Create {...props}>
    <SimpleForm redirect="list">
      <TextInput source="name" />
      <ImageInput
        source="image"
        label="Image"
        accept="image/*"
        multiple={false}
      >
        <ImageField source="uri" title="name" />
      </ImageInput>
    </SimpleForm>
  </Create>
);
