import { HomeIcon, SettingsIcon, UserIcon } from 'lucide-react';
import { useState } from 'react';
import { Calendar } from './components/ui/calendar';
import { Menubar, MenubarMenuProps, SelectMultiple, SelectOptionsProps } from './components/ui-custom';
import { Accordion, AccordionItemProps } from './components/ui-custom/accordion';
import { Alert } from './components/ui-custom/alert';
import { AlertDialog } from './components/ui-custom/alert-dialog';
import { Avatar } from './components/ui-custom/avatar';
import { Breadcrumb } from './components/ui-custom/breadcrumb';
import { Dialog } from './components/ui-custom/dialog';
import { DropdownMenu, DropdownMenuItemProps } from './components/ui-custom/dropdown-menu';
import { Icon } from './components/ui-custom/icon';
import { InputNumber } from './components/ui-custom/input-number';
import { Tabs } from './components/ui-custom/tabs';
import { Upload, UploadArea } from './components/ui-custom/upload';
import { Button } from '@/components/ui-custom/button';

const AccordionData: AccordionItemProps[] = [
  {
    value: '1',
    title: 'Teste',
    content: 'Teste',
  },
  {
    value: '2',
    title: 'Teste',
    content: 'Teste',
  },
];

const menuItems: DropdownMenuItemProps[] = [
  {
    key: 'separator',
    label: 'Titulo',
    type: 'separator',
  },
  {
    key: 'profile',
    icon: <Icon name="User" size={16} />,
    label: 'Perfil',
    onClick: () => alert('Abrindo perfil...'),
  },

  {
    key: 'settings',
    icon: <Icon name="Settings" size={16} />,
    label: 'Configurações',
    children: [
      {
        key: 'account',
        label: 'Conta',
        onClick: () => alert('Acessando configurações da conta...'),
      },
      {
        key: 'security',
        label: 'Segurança',
        onClick: () => alert('Acessando configurações de segurança...'),
      },
    ],
  },
  {
    key: 'logout',
    icon: <Icon name="LogOut" size={16} />,
    label: 'Sair',
    shortcut: '⌘Q',
    onClick: () => alert('Saindo...'),
  },
];

const menuBarItems: MenubarMenuProps[] = [
  {
    label: 'Arquivo',
    items: [
      {
        key: 'new',
        label: 'Novo',
        icon: <HomeIcon />,
        shortcut: 'Ctrl+N',
        onClick: () => alert('Novo clicado'),
      },
      {
        key: 'open',
        label: 'Abrir',
        shortcut: 'Ctrl+O',
        onClick: () => alert('Abrir clicado'),
      },
      {
        key: 'separator1',
        type: 'separator',
      },
      {
        key: 'exit',
        label: 'Sair',
        onClick: () => alert('Sair clicado'),
      },
    ],
  },
  {
    label: 'Editar',
    items: [
      {
        key: 'undo',
        label: 'Desfazer',
        shortcut: 'Ctrl+Z',
        onClick: () => alert('Desfazer clicado'),
      },
      {
        key: 'redo',
        label: 'Refazer',
        shortcut: 'Ctrl+Y',
        onClick: () => alert('Refazer clicado'),
      },
    ],
  },
  {
    label: 'Configurações',
    items: [
      {
        key: 'profile',
        label: 'Perfil',
        icon: <UserIcon />,
        onClick: () => alert('Perfil clicado'),
        children: [
          {
            key: 'viewProfile',
            label: 'Ver perfil',
            onClick: () => alert('Ver perfil clicado'),
          },
          {
            key: 'editProfile',
            label: 'Editar perfil',
            onClick: () => alert('Editar perfil clicado'),
          },
        ],
      },
      {
        key: 'preferences',
        label: 'Preferências',
        icon: <SettingsIcon />,
        onClick: () => alert('Preferências clicado'),
      },
    ],
  },
];

function App() {
  const [selectedValue, setSelectedValue] = useState<any>([]);
  const [uploadValue, setUploadValue] = useState<File[] | null>([]);

  const options: SelectOptionsProps[] = [
    { value: 'apple', label: 'Maçã' },
    {
      value: 'banana',
      label:
        'Bananaasdasdasdasdasdasdas asd as a s asd as das dad asd as das das das dasd as dasd as daas das as das das as das das d',
    },
    { value: 'grape', label: 'Uva', disabled: true },
    { value: 'orange', label: 'Laranja' },
  ];

  return (
    <div className="m-20">
      <Upload
        // accept={['image/png', 'image/jpeg']}
        accept={{
          'image/png': [],
          'image/jpeg': [],
        }}
        onValueChange={(value) => setUploadValue(value)}
        value={uploadValue}
      >
        <UploadArea />
      </Upload>
      <Dialog title="Teste" trigger={<Button>Open Dialog</Button>}>
        <AlertDialog title="Teste">
          <Button size="default" icon="Lock">
            Teste
          </Button>
        </AlertDialog>

        <Accordion data={AccordionData} type="single" collapsible />
        <Alert title="Teste" description="Teste" icon="Lock" />

        <Avatar fallback="K" />

        <InputNumber />

        <Breadcrumb
          items={[
            { key: '1', label: 'Teste' },
            { key: '2', label: 'Teste' },
            {
              key: '3',
              label: 'Teste',
              children: [
                { key: '1', label: 'Teste' },
                { key: '1', label: 'Teste' },
                { key: '1', label: 'Teste' },
                { key: '1', label: 'Teste' },
              ],
            },
            { key: '4', label: 'Teste', onClick() {} },
            { key: '5', label: 'Teste', isPage: true },
          ]}
        />

        <Menubar menu={menuBarItems} />
        <Calendar />

        <DropdownMenu items={menuItems}>
          <Button variant="outline">Abrir Menu</Button>
        </DropdownMenu>
        <br />
        <br />
        <br />
        <SelectMultiple
          value={selectedValue}
          onValueChange={setSelectedValue}
          options={options}
          placeholder="Selecione uma fruta"
        />
      </Dialog>
    </div>
  );
}

export default App;
