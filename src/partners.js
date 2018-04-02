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
  <List {...props} title='Parceiros' >
    <Datagrid>
      <NumberField source="id" label='ID Orama' />
      <TextField source="fb_id" label='ID do facebook' />
      <TextField source="fb_user_name" label='Usuário do facebook' />
      <TextField source="name" label='Nome da empresa' />
      <TextField source="subtitle" label='Slogan' />
      <ImageField source="logo.uri" label='Logo' />
      <ReferenceArrayField
        label="Segmentos de atuação"
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
      <DisabledInput source="id" label='ID Orama' />
      <ReferenceArrayInput
        label="Segmentos de atuação"
        source="segmentIds"
        reference="segments"
      >
        <SelectArrayInput optionText="name" />
      </ReferenceArrayInput>
      <TextInput source="fb_id" label='ID do facebook' />
      <TextInput source="fb_user_name" label='Usuário do facebook' />
      <TextInput source="name" label='Nome da empresa' />
      <TextInput source="subtitle" label='Slogan' />
      <ImageInput source="logo" label="Logo" accept="image/*">
        <ImageField source="uri" title="name" />
      </ImageInput>
    </SimpleForm>
  </Edit>
);

export const PartnerCreate = props => (
  <Create {...props}>
    <SimpleForm redirect="list">
      <ReferenceArrayInput
        label="Segmentos de atuação"
        source="segmentIds"
        reference="segments"
        allowEmpty
      >
        <SelectArrayInput optionText="name" />
      </ReferenceArrayInput>
      <TextInput source="fb_id" label='ID do facebook' />
      <TextInput source="fb_user_name" label='Usuário do facebook' />
      <TextInput source="name" label='Nome' />
      <TextInput source="subtitle" label='Slogan' />
      <ImageInput source="logo" label="Logo" accept="image/*">
        <ImageField source="uri" title="name" />
      </ImageInput>
    </SimpleForm>
  </Create>
);

const PartnerFilter = props => (
  <Filter {...props}>
    <ReferenceArrayInput
      label="Segmentos de atuação"
      source="segmentIds"
      reference="segments"
      allowEmpty
    >
      <SelectArrayInput optionText="name" />
    </ReferenceArrayInput>
  </Filter>
);
