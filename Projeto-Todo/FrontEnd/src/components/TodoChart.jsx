import React from "react";
import Chart from "react-apexcharts";

export default function TodoChart({ todos }) {
    const situacoes = {};

    todos.forEach((todo) => {
        const situacao = todo.situacao || "Sem situação";

        situacoes[situacao] = (situacoes[situacao] || 0) + 1;
    });

    const categories = Object.keys(situacoes);
    const values = Object.values(situacoes);

    const cores = {
        PENDENTE: "#9CA3AF",
        EM_ANDAMENTO: "#EAB308",
        CONCLUIDA: "#22C55E",
        CANCELADA: "#EF4444",
        "Sem situação": "#6B7280",
    };

    const colors = categories.map(
        (situacao) => cores[situacao] || "#3B82F6"
    );

    const options = {
        chart: {
            type: "bar",
            toolbar: {
                show: false,
            },
        },

        colors: colors,

        plotOptions: {
            bar: {
                borderRadius: 6,
                columnWidth: "50%",
                distributed: true,
            },
        },

        xaxis: {
            categories: categories,
            title: {
                text: "Situação",
            },
        },

        yaxis: {
            min: 0,
            title: {
                text: "Quantidade de tarefas",
            },
        },

        dataLabels: {
            enabled: true,
        },

        title: {
            text: "Tarefas por situação",
            align: "center",
        },

        legend: {
            show: false,
        },
    };

    const series = [
        {
            name: "Tarefas",
            data: values,
        },
    ];

    return (
        <div className="bg-white rounded-xl border border-gray-200 p-6 mb-6">
            <Chart
                options={options}
                series={series}
                type="bar"
                height={350}
            />
        </div>
    );
}