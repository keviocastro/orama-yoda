import React from "react";
import {
  List,
  Datagrid,
  TextField,
  EditButton,
  NumberField,
  Edit,
  DisabledInput,
  ImageInput,
  ImageField,
  ReferenceArrayField,
  ReferenceArrayInput,
  SelectArrayInput,
  SingleFieldList,
  ChipField,
  TextInput,
  SimpleForm,
  Create,
  Filter
} from "admin-on-rest";

export const PartnerList = props => (
  <List {...props} filters={<PartnerFilter />}>
    <Datagrid>
      <NumberField source="id" />
      <TextField source="fb_id" />
      <TextField source="name" />
      <TextField source="subtitle" />
      <ImageField source="logo.uri" />
      <ReferenceArrayField
        label="Segments"
        reference="segments"
        source="segmentIds"
      >
        <SingleFieldList>
          <ChipField source="name" />
        </SingleFieldList>
      </ReferenceArrayField>
      <EditButton />
    </Datagrid>
  </List>
);

export const PartnerEdit = props => (
  <Edit {...props}>
    <SimpleForm>
      <DisabledInput source="id" />
      <ReferenceArrayInput
        label="segments"
        source="segmentIds"
        reference="segments"
      >
        <SelectArrayInput optionText="name" />
      </ReferenceArrayInput>
      <TextInput source="fb_id" />
      <TextInput source="name" />
      <TextInput source="subtitle" />
      <ImageInput source="logo" label="Logo" accept="image/*">
        <ImageField source="uri" title="name" />
      </ImageInput>
    </SimpleForm>
  </Edit>
);

export const PartnerCreate = props => (
  <Create {...props}>
    <SimpleForm redirect="list">
      <DisabledInput source="id" />
      <ReferenceArrayInput
        label="Segments"
        source="segmentIds"
        reference="segments"
        allowEmpty
      >
        <SelectArrayInput optionText="name" />
      </ReferenceArrayInput>
      <TextInput source="fb_id" />
      <TextInput source="name" />
      <TextInput source="subtitle" />
      <ImageInput source="logo" label="Logo" accept="image/*">
        <ImageField source="uri" title="name" />
      </ImageInput>
    </SimpleForm>
  </Create>
);

const PartnerFilter = props => (
  <Filter {...props}>
    <ReferenceArrayInput
      label="Segments"
      source="segmentIds"
      reference="segments"
      allowEmpty
    >
      <SelectArrayInput optionText="name" />
    </ReferenceArrayInput>
  </Filter>
);
