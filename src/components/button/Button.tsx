

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}
// Cria uma **interface `ButtonProps`** que define o tipo das props que o botão vai aceitar.
// `extends React.ButtonHTMLAttributes<HTMLButtonElement>`: importa **todas as props nativas** que um botão HTML aceita (tipo `onClick`, `disabled`, `type`, etc).
// - `children: React.ReactNode`: obriga a ter **conteúdo dentro do botão** (como texto ou ícones).

const Button: React.FC<ButtonProps> = ({ children, ...rest }) => {
// Cria o componente Button.
// Usa React.FC<ButtonProps> pra dizer que o componente é uma função que recebe as props do tipo ButtonProps.
// Faz desestruturação das props: pega children separado, e o resto (...rest) pega tudo que sobrar (tipo onClick, className, etc).
  return (
    <button {...rest}>
      {children}
    </button>
  );
};

// - Renderiza um `<button>`.
// - Usa `{...rest}` para aplicar todas as props extras automaticamente no botão.
// - Coloca `{children}` dentro do botão — o conteúdo que você passou.

export default Button;

// RESUMO:
// componente de botão personalizado (Button) em React usando TypeScript, que aceita todas as propriedades de um <button> nativo do HTML, além de exigir que você passe conteúdo dentro dele (children).
// é um componente reaproveitável e digitado com segurança. Serve como base pra você estilizar ou adicionar lógica própria, mantendo as vantagens de um <button> nativo.