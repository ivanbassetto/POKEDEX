import styles from "./DropdownBox.module.css";

interface DropdownBoxProps {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>; 
  selectedOption: 'Number' | 'Name';
  setSelectedOption: React.Dispatch<React.SetStateAction<'Number' | 'Name'>>;
}

// Mesmo que as funções sejam alteradas aqui, precisa do set no header mesmo assim, como se ele fosse um mensageiro

const DropdownBox: React.FC<DropdownBoxProps> = ({ isOpen, selectedOption, setSelectedOption, setIsOpen }) => {
  if (!isOpen) return null;
  // DropdownBoxProps é a interface que define o que esse componente espera receber como props.
  // desestruturando as props direto na assinatura pra poder usar elas diretamente no componente.
  // isOpen: se o dropdown deve aparecer ou não.
  // selectedOption: qual opção está selecionada ('Number' ou 'Name').
  // setSelectedOption: função pra atualizar a opção selecionada.
  // setIsOpen: função pra fechar o dropdown (ou abrir, se quiser).

  //  if (!isOpen) return null // Isso é uma validação condicional simples.
  // Se isOpen for false, o componente não renderiza nada.
  // return null significa: não mostra o dropdown.
  // Serve pra controlar a exibição do menu (dropdown) com base no estado vindo da HomeScreen.

  const options: ('Number' | 'Name')[] = ['Number', 'Name'];
  //  Aqui você define as opções disponíveis no dropdown.
  // É um array de strings com os valores 'Number' e 'Name'.
  // O tipo explícito ('Number' | 'Name')[] deixa claro pro TypeScript que só essas duas strings são válidas.

  return (
    <div className={styles.dropdown_box}>
      <div className={styles.dropdown_header}>
        <span className={styles.dropdown_title}>Sort by:</span>
      </div>
      <div className={styles.dropdown_options}>
        {options.map((option) => ( //Itera sobre o array options (que é ['Number', 'Name']), gerando um elemento para cada opção.
          <div
            key={option} // (necessária no React para listas).
            className={`${styles.radio_option} ${selectedOption === option ? 'selected' : ''}`}
            onClick={() => { //Atualiza a opção selecionada chamando setSelectedOption(option).
              setSelectedOption(option);
              setIsOpen(false); // fecha o dropdown ao selecionar uma opção
            }}
          >
            <div className={styles.radio_button}> 
              {/* // Dentro da div da opção tem uma div para o “botão de rádio” visual. */}
              {selectedOption === option && <div className={styles.selected_indicator} />}
              {/* Se a opção está selecionada, renderiza uma outra div com a classe selected_indicator (ex: um círculo preenchido para indicar que está marcado). */}
            </div>
            <span className={styles.option_text}>{option}</span>
            {/* Depois do botão, mostra o texto da opção ("Number" ou "Name") com a classe option_text. */}
          </div>
        ))} {/* Fecha o map, ou seja, termina a renderização de cada opção. */}
      </div>
    </div>
  );
};

export default DropdownBox;


// o radio foi totalmente personalizado com CSS, não existe um input radio real aqui.

// Resumo do comportamento:
// Renderiza título fixo “Sort by:”
// Renderiza as opções do dropdown como botões clicáveis
// Marca visualmente a opção selecionada
// Quando o usuário clica numa opção, atualiza o estado e fecha o dropdown