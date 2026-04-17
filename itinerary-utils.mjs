const TAGS_VALIDAS = new Set(["fixo", "sugestao", "descanso", "viagem"]);

export function escapeHtml(value) {
  return String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

export function sanitizeTag(tag) {
  return TAGS_VALIDAS.has(tag) ? tag : "sugestao";
}

export function atualizarItemEditado(itinerario, index, dadosAtualizados) {
  return itinerario.map((item, i) => {
    if (i !== index) return item;
    return {
      ...item,
      cidade: dadosAtualizados.cidade,
      atividade: dadosAtualizados.atividade,
      tag: sanitizeTag(dadosAtualizados.tag)
    };
  });
}

export function reordenarItinerario(itinerario, orderIndices) {
  return orderIndices.map((idx) => itinerario[idx]).filter(Boolean);
}

export function aplicarDatasFixasAoItinerario(itinerario, agendaFixa) {
  return itinerario.map((item, idx) => {
    if (idx < agendaFixa.length) {
      return {
        ...item,
        data: agendaFixa[idx].data,
        diaSemana: agendaFixa[idx].diaSemana
      };
    }
    return item;
  });
}
