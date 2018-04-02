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
  <List {...props} title='Segmentos'>
    <Datagrid>
      <TextField source="id" label="ID Orama" />
      <TextField source="name" label="Nome" />
      <ImageField source="image.uri" label="Imagem do segmento" />
      <EditButton />
    </Datagrid>
  </List>
);

export const SegmentEdit = props => (
  <Edit {...props} title='Alterando segmento'>
    <SimpleForm redirect="list">
      <DisabledInput source="id" label="ID Orama" />
      <TextInput source="name" label="Nome" />
      <ImageInput
        label="Imagem do segmento"
        source="image"
        label="Imagem"
        accept="image/*"
        multiple={false}
      >
        <ImageField source="uri" title="name" />
      </ImageInput>
    </SimpleForm>
  </Edit>
);

export const SegmentCreate = props => (
  <Create {...props} title='Criando um segmento'>
    <SimpleForm redirect="list">
      <TextInput source="name" label="Nome" />
      <ImageInput
        source="image"
        label="Imagem do segmento"
        accept="image/*"
        multiple={false}
      >
        <ImageField source="uri" title="name" />
      </ImageInput>
    </SimpleForm>
  </Create>
);
