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
    LongTextInput,
    DateField,
    BooleanField,
    BooleanInput,
    DateInput
} from "admin-on-rest";

export const NotifierList = props => (
    <List {...props} title='Notificações'>
        <Datagrid>
            <TextField source="title" label="Titulo" />
            <TextField source="message" label="Mensagem" />
            <ImageField source="image" label="Imagem" />
            <DateField source="schedule" label="Agendamento" showTime options={{ weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric' }} />
            <BooleanField source="notified" label="Notificado" />
            <EditButton />
        </Datagrid>
    </List >
);

export const NotifierEdit = props => (
    <Edit {...props} title='Alterando a notificação'>
        <SimpleForm redirect="list">
            <DisabledInput source="id" label="ID Orama" />
            <TextInput source="title" label="Titulo" />
            <LongTextInput source="message" label="Mensagem" />
            <DateInput source="schedule_date" label="Data do Agendamento" />
            <TextInput source="schedule_time" label="Horário do agendamento" type="time" />
            <BooleanInput source="notified" label="Notificado" />
            <ImageInput
                label="Imagem"
                source="image"
                accept="image/*"
                multiple={false}
            >
                <ImageField source="image" title="Imagem" />
            </ImageInput>
        </SimpleForm>
    </Edit>
);

export const NotifierCreate = props => (
    <Create {...props} title='Criando uma notificação'>
        <SimpleForm redirect="list">
            <TextInput source="title" label="Titulo" />
            <LongTextInput source="message" label="Mensagem" />
            <DateField source="schedule_date" label="Data do Agendamento" />
            <TextInput source="schedule_time" label="Horário do agendamento" type="time" />
            <ImageInput
                label="Imagem"
                source="image"
                accept="image/*"
                multiple={false}
            >
                <ImageField source="image" title="Imagem" />
            </ImageInput>
        </SimpleForm>
    </Create>
);
