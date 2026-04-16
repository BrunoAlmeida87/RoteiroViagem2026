import test from "node:test";
import assert from "node:assert/strict";
import {
  escapeHtml,
  sanitizeTag,
  atualizarItemEditado,
  reordenarItinerario
} from "./itinerary-utils.mjs";

test("escapeHtml neutraliza tags maliciosas", () => {
  const entrada = `<img src=x onerror="alert('xss')">`;
  const resultado = escapeHtml(entrada);
  assert.equal(
    resultado,
    "&lt;img src=x onerror=&quot;alert(&#39;xss&#39;)&quot;&gt;"
  );
});

test("sanitizeTag usa fallback quando tag é inválida", () => {
  assert.equal(sanitizeTag("inexistente"), "sugestao");
  assert.equal(sanitizeTag("fixo"), "fixo");
});

test("atualizarItemEditado altera somente o índice correto", () => {
  const itinerario = [
    { cidade: "A", atividade: "Atv A", tag: "fixo" },
    { cidade: "B", atividade: "Atv B", tag: "descanso" }
  ];

  const atualizado = atualizarItemEditado(itinerario, 1, {
    cidade: "B2",
    atividade: "Atv B2",
    tag: "viagem"
  });

  assert.deepEqual(atualizado[0], itinerario[0]);
  assert.deepEqual(atualizado[1], {
    cidade: "B2",
    atividade: "Atv B2",
    tag: "viagem"
  });
});

test("reordenarItinerario segue índices informados", () => {
  const itinerario = [{ data: "23/04" }, { data: "24/04" }, { data: "25/04" }];
  const ordem = [2, 0, 1];
  const resultado = reordenarItinerario(itinerario, ordem);
  assert.deepEqual(resultado, [
    { data: "25/04" },
    { data: "23/04" },
    { data: "24/04" }
  ]);
});
