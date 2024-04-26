
// Importa o React e os hooks necessários do React
import React, { useState } from 'react';
// Importa o hook useForm do react-hook-form para lidar com formulários de maneira eficiente
// Obs: Para instalar (npm install react-hook-form)
import { useForm } from 'react-hook-form';
// Importa o arquivo de estilos CSS
import '../css/style.css';
// Importa a imagem de fundo do login
import minhaImagem from '../images/login.jpg';
// Importa a imagem de verificação
import verified from '../images/verified.png';


// Função principal que representa o componente do formulário
function MyForm() {
    // Destruturação do objeto retornado pelo hook useForm
    // formState é um objeto que contém o estado do formulário, e errors é uma propriedade desse objeto
    const { register, handleSubmit, formState: { errors } } = useForm();
    // Estado local para controlar o estado do formulário
    const [status, setStatus] = useState({ submittedSuccessfully: false, loading: false, showPassword: false });

    // Função que é chamada quando o formulário é enviado
    const onSubmit = data => {
        // { ...status }: O operador de propagação (...) é utilizado para criar uma cópia do estado atual (status). Isso é feito para garantir que não estamos modificando diretamente o estado anterior, respeitando o princípio de imutabilidade no React.
        setStatus({ ...status, loading: true }); // Atualiza o estado para indicar que está carregando

        // Simula um tempo de espera antes de atualizar o estado para sucesso
        setTimeout(() => {
            setStatus({ submittedSuccessfully: true, loading: false });
        }, 1000);
    };

    // Função para gerar mensagens de erro com base no nome do campo
    const generateErrorMessage = fieldName => {
        return {
            required: `${fieldName} é obrigatório`, // Mensagem para campos obrigatórios
            pattern: fieldName === 'email' ? 'Formato de e-mail inválido' : null  // Mensagem para formato de e-mail inválido
        };
    };

    // Função para lidar com o retorno à página inicial
    const handleReturnButtonClick = () => {
        // Redireciona para a página inicial
        window.location.href = '/';
    };

     // Renderização condicional (usandon ternário ?) com base no sucesso do envio do formulário
    return (
        <div className='container'>
            {status.submittedSuccessfully ? (
                // Se o formulário foi enviado com sucesso, exibe uma mensagem de sucesso
                <div className='success-message'>
                    <img src={verified} alt='Verificado' />
                    <h2>Formulário Enviado com Sucesso!</h2>
                    <p>Obrigado por enviar o formulário.</p>
                    <button className='btn' onClick={handleReturnButtonClick}>Retornar</button>
                </div>
            ) : (
                // Se o formulário ainda não foi enviado com sucesso, exibe o formulário para preenchimento
                <div className='form-sign-up'>
                    <div>
                        <img src={minhaImagem} alt='imagem de uma pessoa se cadastrando pelo celular' />
                    </div>

                    <section>
                        <h1>Login</h1>

                        {/* Formulário com campos controlados pelo hook useForm */}
                        <form onSubmit={handleSubmit(onSubmit)}>

                            {/* Campo Nome */}
                            <div className='form flex'>
                                <label htmlFor='name'>Email</label>
                                <input
                                    {...register("firstName", generateErrorMessage("Nome"))}
                                    placeholder="Email"
                                    id='name'
                                    autoComplete='off'
                                    className={errors.firstName ? 'error' : ''}
                                />
                                {errors.firstName && <span className='error-message'>{errors.firstName.message}</span>}
                            </div>

                            { /* Campo Sobrenome */}
                            <div className='form flex'>
                                <label htmlFor='sobrenome'>CPF</label>
                                <input
                                    {...register("lastName", generateErrorMessage("Sobrenome"))}
                                    placeholder="CPF"
                                    id='sobrenome'
                                    autoComplete='off'
                                    className={errors.lastName ? 'error' : ''}
                                />
                                {errors.lastName && <span className='error-message'>{errors.lastName.message}</span>}
                            </div>

                            { /* Campo Senha */}
                            <div className='form flex'>
                                <label htmlFor='password'>Senha</label>
                                <div className="password-input-container">
                                    <input
                                        {...register("password", generateErrorMessage("Senha"))}
                                        placeholder="Senha"
                                        id='password'
                                        autoComplete='off'
                                        type={status.showPassword ? 'text' : 'password'}
                                        className={errors.password ? 'error' : ''}
                                    />

                                    <button
                                        type="button" // Define o tipo do botão como "button" para evitar comportamento padrão de envio de formulário
                                        className='password-toggle' // Adiciona a classe CSS 'password-toggle' para estilização específica
                                        onClick={() => setStatus({ ...status, showPassword: !status.showPassword })}
                                        // Define a função de clique que atualiza o estado 'status', alternando o valor de 'showPassword'
                                    >
                                        {status.showPassword ? <i className="fas fa-eye"></i> : <i className="fas fa-eye-slash"></i>}
                                        {/* Renderiza condicionalmente um ícone de olho aberto ou fechado com base no valor de 'showPassword' */}
                                    </button>

                                </div>
                                {errors.password && <span className='error-message'>{errors.password.message}</span>}
                            </div>

                            {/* Botão Enviar */}
                            <button className='btn' type="submit" disabled={status.loading}>
                                {status.loading ? 'Enviando...' : 'Entrar'}
                            </button>
                        </form>
                        {status.loading && <p>Carregando...</p>}
                    </section>
                </div>
            )}
        </div>
    );
}

// Exporta componente "MyForm"
export default MyForm;