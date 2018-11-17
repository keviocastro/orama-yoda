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
  ImageField,
  NumberField,
  NumberInput
} from "admin-on-rest";

export const SegmentList = props => (
  <List {...props} title='Segmentos' sort={{ field: 'priority' }}>
    <Datagrid>
      <TextField source="name" label="Nome" />
      <NumberField source="priority" label="Prioridade" />
      <ImageField source="image" label="Imagem do segmento" />
      <EditButton />
    </Datagrid>
  </List >
);

export const SegmentEdit = props => (
  <Edit {...props} title='Alterando segmento'>
    <SimpleForm redirect="list">
      <DisabledInput source="id" label="ID Orama" />
      <TextInput source="name" label="Nome" />
      <NumberInput source="priority" label="Prioridade" />
      <ImageInput
        label="Imagem do segmento"
        source="image"
        accept="image/*"
        multiple={false}
      >
        <ImageField source="image" title="name" />
      </ImageInput>
    </SimpleForm>
  </Edit>
);

export const SegmentCreate = props => (
  <Create {...props} title='Criando um segmento'>
    <SimpleForm redirect="list">
      <TextInput source="name" label="Nome" />
      <NumberInput source="priority" label="Prioridade" />
      <ImageInput
        source="image"
        label="Imagem do segmento"
        accept="image/*"
        multiple={false}
      >
        <ImageField source="image" title="name" />
      </ImageInput>
    </SimpleForm>
  </Create>
);
