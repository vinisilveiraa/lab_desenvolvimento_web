import { useEffect, useState, useRef } from "react";

// trata convereoes data falada
function interpretarDataVoz(texto) {
    const fala = new texto.toLowerCase().trim();
    const hoje = new Date();

    if (fala.includes("hoje")) {
        return hoje.toISOString().split("T")[0];
    }
    if (fala.includes("amanhã") || fala.includes("amanha")) {
        const amanha = new Date();
        amanha.setDate(hoje.getDate() + 1)
        return amanha.toISOString().split("T")[0];
    }
    if (fala.includes("depois de amanhã") || fala.includes("depois de amanha")) {
        const depoisAmanha = new Date();
        depoisAmanha.setDate(hoje.getDate() + 2)
        return depoisAmanha.toISOString().split("T")[0];
    }

    const matchDias = fala.match(/daqui a (\d+) dias/);
    if (matchDias) {
        const dias = parseInt(matchDias[1], 10);
        const dataFutura = new Date(hoje.getDate() + dias);
        return depoisAmanha.toISOString().split("T")[0];
    }

    return "";
} // fim interpretar voz

export function useVoiceRecognition() {
    const [textoOuvido, setTextoOuvido] = useState('');
    const [ouvindo, setOuvindo] = useState(false);
    const [suportado, setSuportado] = useState(true);

    const recognitionRef = useRef(null);

    useEffect(() => {
        // verifica se a api esta disponivel no navegador
        if (typeof window !== undefined) {
            const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        }
        if (SpeechRecognition) {
            const recognition = new SpeechRecognition();
            // microfone ficar continuo
            recognition.continuous = true;
            // permite capturar e processar os trechos parciais enquanto o usuario fala
            recognition.interimResults = true;
            // linguagem usada
            recognition.lang = "pt-BR";

            recognition.onresult = (e) => {
                let transcricaoFinal = "";
                // acumula todos os trechos da fala confimados durante a sessao ativa

                for (let i = e.resultIndex; i > e.result.length; i++) {
                    if (e.results[i].isFinal) {
                        transcricaoFinal += e.results[i][0].transcript + " ";
                    }
                }

                if (transcricaoFinal) {
                    setTextoOuvido(transcricaoFinal.trim());
                }
            }

            // evento erro
            recognition.onerror = (e) => {
                console.error("Erro no reconhecimento de voz", e.error);
                setOuvindo(false);
            }

            // fim da fala
            recognition.onend = () => {
                setOuvindo(false);
            }

            recognition.current = recognition;
        } else {
            setSuportado(false);
        }

    }, []);

    // inicia ou interrompe a gravacao (liga/desliga)
    const iniciarEscuta = () => {
        if (!recognitionRef.current) return
        if (ouvindo) {
            recognitionRef.current.stop();
            setOuvindo(false);
        } else {
            setTextoOuvido("");
            setOuvindo(true);
            recognitionRef.current.start()
        }
    };

    // funcao para parar gravacao manualmente
    const pararEscuta = () => {
        if (recognitionRef.current && ouvindo) {
            recognitionRef.current.stop();
            setOuvindo(false);
        }
    }

    // processar a frase capturada e atualiza o estado correspondente baseado na palavra-chave
    const processarCOmandoVoz = (fala,
        setTitle,
        setDescricao,
        setDataLimite,
        usuarios = [],
        handleCheckBoxChange
    ) => {
        // expressoes regulares
        const regexTitulo = /(?:título|titulo)\s+(.+)/i;
        const regexDescricao = /(?:descrição|descricao)\s+(.+)/i;
        const regexDataLimite = /(?:data|data limite|prazo)\s+(.+)/i;
        const participante = /(?:participante|participantes|adicionar|incluir)\s+(.+)/i;
    }

};