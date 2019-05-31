const q_ofT = T => Math.pow(2,T);
const G_ofT = T => q_ofT(T) >> 1;



/*
    (p-1,0)|p;1 > 0
    (p-1,0)|p;2
        maxT -> D:    = 1
        --T  -> D: (p-1, n+G)|p;1 ~= A: ()
        --T  ->
    
*/


function* gen_A_l1(maxP) {
    const abs_max_T = Math.ceil(Math.log2(maxP));
    const prev_As = Array.from(abs_max_T); // 

    
    for(let p=1; p<= maxP; ++p) {
        const maxT = Math.ceil(Math.log2(p))+1;    
        let [T, q, G] = [maxT, q_ofT(maxT), G_ofT(maxT)];

        const C = 2/(q+1);

        const try_q = q/2;
        const try_G = G/2;
        const try_D = prev_As[]
        const try_C = 2*D/(try_q+1);

        yield ({p, T, q, G, C });
    }
    return;
}

const A_l1_to_p = p => gen_A_l1(p);

console.log([,...A_l1_to_p(10)]);