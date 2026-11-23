import type { Goal } from '../entities/goal';
import { conditionStep } from '../entities/conditionStep';
import { Step } from '../entities/step';

type Graph = Map<string, string[]>;
type VisitState = 'unvisited' | 'visiting' | 'done'

//evite la dependance circulaire
export class DependencyEngine {

  //vérifie si un cycle existe déjà
  //transformer les étapes d'un objectif en graphe exploitable par les algorithmes
  buildGraph(goal: Goal): Map<string, string[]> {
    const graph: Graph = new Map();

    for(const step of goal.steps){
      const referencedIds = step.conditions
        .filter((c): c is conditionStep => c instanceof conditionStep)
        .map((c)=> c.referencedStep.id)
      graph.set(step.id, referencedIds);
    }
    return graph
  }

  //vérifie si une nouvelle dépendance créerait un cycle
  hasCycle(goal: Goal): boolean {
    const graph = this.buildGraph(goal);
    const state = new Map<string, VisitState>();

    const visit = (id: string): boolean => {
      const current = state.get(id) ?? 'unvisited';
      if(current === 'visiting') return true;
      if(current === 'done') return false;

      state.set(id, 'visiting');
      //DFS
      for(const next of graph.get(id)?? []){
        //récursivité qui permet de suivre les dépendances en profondeur (fonction s'appelle elle-meme)
        if (visit(next)) return true
      }
      state.set(id,'done');
      return false;
    }

    for(const id of graph.keys()){
      if (visit(id)) return true;
    }

    return false
  }

  //	Vérifie si une nouvelle dépendance créerait un cycle
  wouldCreateCycle(goal: Goal, step: Step, referencedStep: Step): boolean {
    if (step.id === referencedStep.id) return true;
    const graph = this.buildGraph(goal);
    return this.canReach(
      graph,
      referencedStep.id,
      step.id
    )
  }

  //Recherche un chemin entre deux étapes
  private canReach(graph: Graph,from: string,to: string): boolean {
    //Set est une structure qui conserve des valeurs uniques
    const seen = new Set<string>();

    //pile avec principe LIFO (Last In, First Out)
    const stack = [from];

    while (stack.length > 0) {
      //pop() retire et retourne le dernier élément de la pile.
      const current = stack.pop()!;
      if (current === to) return true;
      if (seen.has(current)) continue;
      seen.add(current);
      stack.push(...(graph.get(current) ?? []));
    }

    return false;
}
}