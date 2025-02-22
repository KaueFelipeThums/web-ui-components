import { useForm } from 'react-hook-form';
import { Card, CardContent, CardHeader } from './components/ui';
import { Input } from './components/ui/input';
import { DatePicker, Form, FormField, InputPassword, toast } from './components/ui-custom';
import { TimePicker } from './components/ui-custom/time-picker';
import { Button } from '@/components/ui-custom/button';

type FormType = {
  login: string;
  senha: string;
};

const rules = {
  login: {
    required: 'Login obrigatório',
  },
  senha: {
    required: 'Senha obrigatória',
  },
};

function App() {
  const form = useForm<FormType>({
    defaultValues: {
      login: '',
      senha: '',
    },
  });

  const onSubmit = (values: FormType) => {
    toast.success(JSON.stringify(values));
    console.log(values);
  };

  return (
    <div className="m-10 flex items-center justify-center">
      <Card className="w-96">
        <CardHeader>Login</CardHeader>
        <CardContent>
          <Form form={form} handleSubmit={onSubmit} className="space-y-4">
            <FormField
              control={form.control}
              label="Login"
              rules={rules.login}
              render={({ field }) => <Input placeholder="Login" {...field} />}
              name="login"
            />

            <FormField
              control={form.control}
              label="Senha"
              rules={rules.senha}
              render={({ field }) => <InputPassword placeholder="Senha" {...field} />}
              name="senha"
            />

            <DatePicker />
            <TimePicker granularity="second" minValue={new Date()} />

            <div className="w-full flex justify-end">
              <Button iconPlacement="right" icon="Send">
                Enviar
              </Button>
            </div>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}

export default App;
