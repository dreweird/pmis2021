export function total_janft(params) {
    if (!params.node.group) {
      return create_totalAB(params.data.janft, params.data.janft_co)
    }
};

export function total_febft(params) {
    if (!params.node.group) {
      return create_totalAB(params.data.febft, params.data.febft_co)
    }
};

export function total_marft(params) {
    if (!params.node.group) {
      return create_totalAB(params.data.marft, params.data.marft_co)
    }
};

export function total_aprft(params) {
    if (!params.node.group) {
      return create_totalAB(params.data.aprft, params.data.aprft_co)
    }
};

export function total_mayft(params) {
    if (!params.node.group) {
      return create_totalAB(params.data.mayft, params.data.mayft_co)
    }
};

export function total_junft(params) {
    if (!params.node.group) {
      return create_totalAB(params.data.junft, params.data.junft_co)
    }
};

export function total_julft(params) {
    if (!params.node.group) {
      return create_totalAB(params.data.julft, params.data.julft_co)
    }
};

export function total_augft(params) {
    if (!params.node.group) {
      return create_totalAB(params.data.augft, params.data.augft_co)
    }
};

export function total_sepft(params) {
    if (!params.node.group) {
      return create_totalAB(params.data.sepft, params.data.sepft_co)
    }
};

export function total_octft(params) {
    if (!params.node.group) {
      return create_totalAB(params.data.octft, params.data.octft_co)
    }
};

export function total_novft(params) {
    if (!params.node.group) {
      return create_totalAB(params.data.novft, params.data.novft_co)
    }
};

export function total_decft(params) {
    if (!params.node.group) {
      return create_totalAB(params.data.decft, params.data.decft_co)
    }
};

export function total_q1_mooe_ft(params) {
    if (!params.node.group) {
      return create_totalABC(
        params.data.janft,
        params.data.febft,
        params.data.marft
      );
    }
  }

  export function total_q1_co_ft(params) {
    if (!params.node.group) {
      return create_totalABC(
        params.data.janft_co,
        params.data.febft_co,
        params.data.marft_co
      );
    }
  }

  export function total_q2_mooe_ft(params) {
    if (!params.node.group) {
      return create_totalABC(
        params.data.aprft,
        params.data.mayft,
        params.data.junft
      );
    }
  }

  export function total_q2_co_ft(params) {
    if (!params.node.group) {
      return create_totalABC(
        params.data.aprft_co,
        params.data.mayft_co,
        params.data.junft_co
      );
    }
  }

  export function total_q3_mooe_ft(params) {
    if (!params.node.group) {
      return create_totalABC(
        params.data.julft,
        params.data.augft,
        params.data.sepft
      );
    }
  }

  export function total_q3_co_ft(params) {
    if (!params.node.group) {
      return create_totalABC(
        params.data.julft_co,
        params.data.augft_co,
        params.data.sepft_co
      );
    }
  }

  export function total_q4_mooe_ft(params) {
    if (!params.node.group) {
      return create_totalABC(
        params.data.octft,
        params.data.novft,
        params.data.decft
      );
    }
  }

  export function total_q4_co_ft(params) {
    if (!params.node.group) {
      return create_totalABC(
        params.data.octft_co,
        params.data.novft_co,
        params.data.decft_co
      );
    }
  }


  export function total_q1(params) {
    if (!params.node.group) {
      return create_totalABC(
        params.getValue('jan_tot'),
        params.getValue('feb_tot'),
        params.getValue('mar_tot')
      );
    }
  }

  export function total_q2(params) {
    if (!params.node.group) {
      return create_totalABC(
        params.getValue('apr_tot'),
        params.getValue('may_tot'),
        params.getValue('jun_tot')
      );
    }
  }

  export function total_q3(params) {
    if (!params.node.group) {
      return create_totalABC(
        params.getValue('jul_tot'),
        params.getValue('aug_tot'),
        params.getValue('sep_tot')
      );
    }
  }
  export function total_q4(params) {
    if (!params.node.group) {
      return create_totalABC(
        params.getValue('oct_tot'),
        params.getValue('nov_tot'),
        params.getValue('dec_tot')
      );
    }
  }

  export function total_mooe_ft(params) {
    if (!params.node.group) {
      return create_totalABCD(
        params.getValue('q1ft'), params.getValue('q2ft'), params.getValue('q3ft'), params.getValue('q4ft')
      );
    }
  }

  export function total_co_ft(params) {
    if (!params.node.group) {
      return create_totalABCD(
        params.getValue('q1ft_co'), params.getValue('q2ft_co'), params.getValue('q3ft_co'), params.getValue('q4ft_co')
      );
    }
  }
  export function grandtotal_ft(params) {
    if (!params.node.group) {
      return create_totalABCD(
        params.getValue('q1_tot'), params.getValue('q2_tot'), params.getValue('q3_tot'), params.getValue('q4_tot')
      );
    }
  }
  
export function create_totalAB(a,b){
    return {
      a: a,
      b: b,
      toString: function() {
        return a + b;
      }
    };
  }

export function create_totalABC(a,b, c){
    return {
      a: a,
      b: b,
      c: c,
      toString: function() {
        return a + b + c;
      }
    };
  }

  export function create_totalABCD(a,b, c, d){
    return {
      a: a,
      b: b,
      c: c,
      d: d,
      toString: function() {
        return a + b + c + d;
      }
    };
  }
  export function create_total(a, b, c, d, e, f, g, h, i, j, k, l) {
    return {
      a: a,
      b: b,
      c: c,
      d: d,
      e: e,
      f: f,
      g: g,
      h: h,
      i: i,
      j: j,
      k: k,
      l: l,
      toString: function() {
        return a + b + c + d + e + f + g + h + i + j + k + l;
      }
    };
  }


  export function TotalQuarterAggFunc(values) {
    var aSum = 0,bSum = 0,cSum = 0;
    values.forEach(function(value) {
      if (value && value.a) {
        aSum += value.a;
      }
      if (value && value.b) {
        bSum += value.b;
      }
      if (value && value.c) {
        cSum += value.c;
      }
    });
    return create_totalABC(aSum, bSum, cSum);
  }

  export function TotalMonthAggFunc(values) {
    var aSum = 0,bSum = 0;
    values.forEach(function(value) {
      if (value && value.a) {
        aSum += value.a;
      }
      if (value && value.b) {
        bSum += value.b;
      }
    });
    return create_totalAB(aSum, bSum);
  }

 export function TotalYearAggFunc(values) {
    var [a, b, c, d, e, f, g, h, i, j, k, l] = [0,0,0,0,0,0,0,0,0,0,0,0];
    values.forEach(function(value) {
      if (value && value.a) {
        a += value.a;
      }
      if (value && value.b) {
        b += value.b;
      }
      if (value && value.c) {
        c += value.c;
      }
      if (value && value.d) {
        d += value.d;
      }
      if (value && value.e) {
        e += value.e;
      }
      if (value && value.f) {
        f += value.f;
      }
      if (value && value.g) {
        g += value.g;
      }
      if (value && value.h) {
        h += value.h;
      }
      if (value && value.i) {
        i += value.i;
      }
      if (value && value.j) {
        j += value.j;
      }
      if (value && value.k) {
        k += value.k;
      }
      if (value && value.l) {
        l += value.l;
      }
    });
    return create_total(a, b, c, d, e, f, g, h, i, j, k, l);
  }

export function GrandTotalAggFunc(values) {
    var [a, b, c, d] = [0,0,0,0];
    values.forEach(function(value) {
      if (value && value.a) {
        a += value.a;
      }
      if (value && value.b) {
        b += value.b;
      }
      if (value && value.c) {
        c += value.c;
      }
      if (value && value.d) {
        d += value.d;
      }
 
    });
    return create_totalABCD(a, b, c, d);
  }

  // Obligations.............
  //////////////////////////

export function total_janfa(params) {
    if (!params.node.group) {
      return create_totalAB(params.data.janfa, params.data.janfa_co)
    }
};

export function total_febfa(params) {
    if (!params.node.group) {
      return create_totalAB(params.data.febfa, params.data.febfa_co)
    }
};

export function total_marfa(params) {
    if (!params.node.group) {
      return create_totalAB(params.data.marfa, params.data.marfa_co)
    }
};

export function total_aprfa(params) {
    if (!params.node.group) {
      return create_totalAB(params.data.aprfa, params.data.aprfa_co)
    }
};

export function total_mayfa(params) {
    if (!params.node.group) {
      return create_totalAB(params.data.mayfa, params.data.mayfa_co)
    }
};

export function total_junfa(params) {
    if (!params.node.group) {
      return create_totalAB(params.data.junfa, params.data.junfa_co)
    }
};

export function total_julfa(params) {
    if (!params.node.group) {
      return create_totalAB(params.data.julfa, params.data.julfa_co)
    }
};

export function total_augfa(params) {
    if (!params.node.group) {
      return create_totalAB(params.data.augfa, params.data.augfa_co)
    }
};

export function total_sepfa(params) {
    if (!params.node.group) {
      return create_totalAB(params.data.sepfa, params.data.sepfa_co)
    }
};

export function total_octfa(params) {
    if (!params.node.group) {
      return create_totalAB(params.data.octfa, params.data.octfa_co)
    }
};

export function total_novfa(params) {
    if (!params.node.group) {
      return create_totalAB(params.data.novfa, params.data.novfa_co)
    }
};

export function total_decfa(params) {
    if (!params.node.group) {
      return create_totalAB(params.data.decfa, params.data.decfa_co)
    }
};

export function total_mooe_fa(params) {
    if (!params.node.group) {
      return create_totalABCD(
        params.getValue('q1fa'), params.getValue('q2fa'), params.getValue('q3fa'), params.getValue('q4fa')
      );
    }
  }

  export function total_co_fa(params) {
    if (!params.node.group) {
      return create_totalABCD(
        params.getValue('q1fa_co'), params.getValue('q2fa_co'), params.getValue('q3fa_co'), params.getValue('q4fa_co')
      );
    }
  }
  export function grandtotal_fa(params) {
    if (!params.node.group) {
      return create_totalABCD(
        params.getValue('q1_tota'), params.getValue('q2_tota'), params.getValue('q3_tota'), params.getValue('q4_tota')
      );
    }
  }

  export function total_q1_mooe_fa(params) {
    if (!params.node.group) {
      return create_totalABC(
        params.data.janfa,
        params.data.febfa,
        params.data.marfa
      );
    }
  }

  export function total_q1_co_fa(params) {
    if (!params.node.group) {
      return create_totalABC(
        params.data.janfa_co,
        params.data.febfa_co,
        params.data.marfa_co
      );
    }
  }

  export function total_q2_mooe_fa(params) {
    if (!params.node.group) {
      return create_totalABC(
        params.data.aprfa,
        params.data.mayfa,
        params.data.junfa
      );
    }
  }

  export function total_q2_co_fa(params) {
    if (!params.node.group) {
      return create_totalABC(
        params.data.aprfa_co,
        params.data.mayfa_co,
        params.data.junfa_co
      );
    }
  }

  export function total_q3_mooe_fa(params) {
    if (!params.node.group) {
      return create_totalABC(
        params.data.julfa,
        params.data.augfa,
        params.data.sepfa
      );
    }
  }

  export function total_q3_co_fa(params) {
    if (!params.node.group) {
      return create_totalABC(
        params.data.julfa_co,
        params.data.augfa_co,
        params.data.sepfa_co
      );
    }
  }

  export function total_q4_mooe_fa(params) {
    if (!params.node.group) {
      return create_totalABC(
        params.data.octfa,
        params.data.novfa,
        params.data.decfa
      );
    }
  }

  export function total_q4_co_fa(params) {
    if (!params.node.group) {
      return create_totalABC(
        params.data.octfa_co,
        params.data.novfa_co,
        params.data.decfa_co
      );
    }
  }


  export function total_fa_q1(params) {
    if (!params.node.group) {
      return create_totalABC(
        params.getValue('jan_tota'),
        params.getValue('feb_tota'),
        params.getValue('mar_tota')
      );
    }
  }

  export function total_fa_q2(params) {
    if (!params.node.group) {
      return create_totalABC(
        params.getValue('apr_tota'),
        params.getValue('may_tota'),
        params.getValue('jun_tota')
      );
    }
  }

  export function total_fa_q3(params) {
    if (!params.node.group) {
      return create_totalABC(
        params.getValue('jul_tota'),
        params.getValue('aug_tota'),
        params.getValue('sep_tota')
      );
    }
  }
  export function total_fa_q4(params) {
    if (!params.node.group) {
      return create_totalABC(
        params.getValue('oct_tota'),
        params.getValue('nov_tota'),
        params.getValue('dec_tota')
      );
    }
  }
  
  export function total_adj(params) {
    if (!params.node.group) {
      return create_totalAB(
        params.getValue('adj_mooe'),
        params.getValue('adj_co'),
      );
    }
  }

  export function tot_adj_mooe(params) {
    if (!params.node.group) {
      return create_totalAB(
        params.getValue('total_ft'),
        params.getValue('adj_mooe'),
      );
    }
  }

  export function tot_adj_co(params) {
    if (!params.node.group) {
      return create_totalAB(
        params.getValue('total_ft_co'),
        params.getValue('adj_co'),
      );
    }
  }
  
  export function adj_allot_total(params) {
    if (!params.node.group) {
      return create_totalAB(
        params.getValue('tot_adj_mooe'),
        params.getValue('tot_adj_co'),
      );
    }
  }

export function unobligated(params) {
  if (!params.node.group) {
    return create_totalAMinusB(
      params.getValue('adj_allot_total'),
      params.getValue('grandtotal_fa'),
    );
  }
}

export function percentage(params) {
  if (!params.node.group) {
    return create_percentage(
      params.getValue('grandtotal_fa'),
      params.getValue('adj_allot_total')
    );
  }
}

function create_totalAMinusB(a, b) {
  return {
    a: a,
    b: b,
    toString: function() {
      return a - b;
    }
  };
}

function create_percentage(a, b) {
  return {
    a: a,
    b: b,
    toString: function() {
      return a && b ? (a / b) * 100 : 0;
    }
  };
}

export function TotalUnobligatedAggFunc(values) {
  var aSum = 0,bSum = 0;
  values.forEach(function(value) {
    if (value && value.a) {
      aSum += value.a;
    }
    if (value && value.b) {
      bSum += value.b;
    }
  });
  return create_totalAMinusB(aSum, bSum);
}

export function TotalpercentAggFunc(values) {
  var aSum = 0,bSum = 0;
  values.forEach(function(value) {
    if (value && value.a) {
      aSum += value.a;
    }
    if (value && value.b) {
      bSum += value.b;
    }
  });
  return create_percentage(aSum, bSum);
}

//////////PHYSICAL

export function Q1_Physical(params) {
  if (!params.node.group) {
    return create_totalABC(
      params.data.jant,
      params.data.febt,
      params.data.mart
    );
  }
}

export function Q2_Physical(params) {
  if (!params.node.group) {
    return create_totalABC(
      params.data.aprt,
      params.data.mayt,
      params.data.junt
    );
  }
}

export function Q3_Physical(params) {
  if (!params.node.group) {
    return create_totalABC(
      params.data.jult,
      params.data.augt,
      params.data.sept
    );
  }
}

export function Q4_Physical(params) {
  if (!params.node.group) {
    return create_totalABC(
      params.data.octt,
      params.data.novt,
      params.data.dect
    );
  }
}

export function GrandTotal_Physical(params) {
  if (!params.node.group) {
    return create_totalABCD(
      params.getValue('Q1_pt'),
      params.getValue('Q2_pt'),
      params.getValue('Q3_pt'),
      params.getValue('Q4_pt')
    );
  }
}

//////DISBURSEMENT

export function total_jandt(params) {
  if (!params.node.group) {
    return create_totalAB(params.data.jandt, params.data.jandt_co)
  }
};

export function total_febdt(params) {
  if (!params.node.group) {
    return create_totalAB(params.data.febdt, params.data.febdt_co)
  }
};

export function total_mardt(params) {
  if (!params.node.group) {
    return create_totalAB(params.data.mardt, params.data.mardt_co)
  }
};

export function total_aprdt(params) {
  if (!params.node.group) {
    return create_totalAB(params.data.aprdt, params.data.aprdt_co)
  }
};

export function total_maydt(params) {
  if (!params.node.group) {
    return create_totalAB(params.data.maydt, params.data.maydt_co)
  }
};

export function total_jundt(params) {
  if (!params.node.group) {
    return create_totalAB(params.data.jundt, params.data.jundt_co)
  }
};

export function total_juldt(params) {
  if (!params.node.group) {
    return create_totalAB(params.data.juldt, params.data.juldt_co)
  }
};

export function total_augdt(params) {
  if (!params.node.group) {
    return create_totalAB(params.data.augdt, params.data.augdt_co)
  }
};

export function total_sepdt(params) {
  if (!params.node.group) {
    return create_totalAB(params.data.sepdt, params.data.sepdt_co)
  }
};

export function total_octdt(params) {
  if (!params.node.group) {
    return create_totalAB(params.data.octdt, params.data.octdt_co)
  }
};

export function total_novdt(params) {
  if (!params.node.group) {
    return create_totalAB(params.data.novdt, params.data.novdt_co)
  }
};

export function total_decdt(params) {
  if (!params.node.group) {
    return create_totalAB(params.data.decdt, params.data.decdt_co)
  }
};

export function total_q1_mooe_dt(params) {
  if (!params.node.group) {
    return create_totalABC(
      params.data.jandt,
      params.data.febdt,
      params.data.mardt
    );
  }
}

export function total_q1_co_dt(params) {
  if (!params.node.group) {
    return create_totalABC(
      params.data.jandt_co,
      params.data.febdt_co,
      params.data.mardt_co
    );
  }
}

export function total_q2_mooe_dt(params) {
  if (!params.node.group) {
    return create_totalABC(
      params.data.aprdt,
      params.data.maydt,
      params.data.jundt
    );
  }
}

export function total_q2_co_dt(params) {
  if (!params.node.group) {
    return create_totalABC(
      params.data.aprdt_co,
      params.data.maydt_co,
      params.data.jundt_co
    );
  }
}

export function total_q3_mooe_dt(params) {
  if (!params.node.group) {
    return create_totalABC(
      params.data.juldt,
      params.data.augdt,
      params.data.sepdt
    );
  }
}

export function total_q3_co_dt(params) {
  if (!params.node.group) {
    return create_totalABC(
      params.data.juldt_co,
      params.data.augdt_co,
      params.data.sepdt_co
    );
  }
}

export function total_q4_mooe_dt(params) {
  if (!params.node.group) {
    return create_totalABC(
      params.data.octdt,
      params.data.novdt,
      params.data.decdt
    );
  }
}

export function total_q4_co_dt(params) {
  if (!params.node.group) {
    return create_totalABC(
      params.data.octdt_co,
      params.data.novdt_co,
      params.data.decdt_co
    );
  }
}

export function totaldt_q1(params) {
  if (!params.node.group) {
    return create_totalABC(
      params.getValue('jandt_tot'),
      params.getValue('febdt_tot'),
      params.getValue('mardt_tot')
    );
  }
}

export function totaldt_q2(params) {
  if (!params.node.group) {
    return create_totalABC(
      params.getValue('aprdt_tot'),
      params.getValue('maydt_tot'),
      params.getValue('jundt_tot')
    );
  }
}

export function totaldt_q3(params) {
  if (!params.node.group) {
    return create_totalABC(
      params.getValue('juldt_tot'),
      params.getValue('augdt_tot'),
      params.getValue('sepdt_tot')
    );
  }
}
export function totaldt_q4(params) {
  if (!params.node.group) {
    return create_totalABC(
      params.getValue('octdt_tot'),
      params.getValue('novdt_tot'),
      params.getValue('decdt_tot')
    );
  }
}

export function total_mooe_dt(params) {
  if (!params.node.group) {
    return create_totalABCD(
      params.getValue('q1dt'), params.getValue('q2dt'), params.getValue('q3dt'), params.getValue('q4dt')
    );
  }
}

export function total_co_dt(params) {
  if (!params.node.group) {
    return create_totalABCD(
      params.getValue('q1dt_co'), params.getValue('q2dt_co'), params.getValue('q3dt_co'), params.getValue('q4dt_co')
    );
  }
}
export function grandtotal_dt(params) {
  if (!params.node.group) {
    return create_totalABCD(
      params.getValue('q1dt_tot'), params.getValue('q2dt_tot'), params.getValue('q3dt_tot'), params.getValue('q4dt_tot')
    );
  }
}

export function total_janda(params) {
  if (!params.node.group) {
    return create_totalAB(params.data.janda, params.data.janda_co)
  }
};

export function total_febda(params) {
  if (!params.node.group) {
    return create_totalAB(params.data.febda, params.data.febda_co)
  }
};

export function total_marda(params) {
  if (!params.node.group) {
    return create_totalAB(params.data.marda, params.data.marda_co)
  }
};

export function total_aprda(params) {
  if (!params.node.group) {
    return create_totalAB(params.data.aprda, params.data.aprda_co)
  }
};

export function total_mayda(params) {
  if (!params.node.group) {
    return create_totalAB(params.data.mayda, params.data.mayda_co)
  }
};

export function total_junda(params) {
  if (!params.node.group) {
    return create_totalAB(params.data.junda, params.data.junda_co)
  }
};

export function total_julda(params) {
  if (!params.node.group) {
    return create_totalAB(params.data.julda, params.data.julda_co)
  }
};

export function total_augda(params) {
  if (!params.node.group) {
    return create_totalAB(params.data.augda, params.data.augda_co)
  }
};

export function total_sepda(params) {
  if (!params.node.group) {
    return create_totalAB(params.data.sepda, params.data.sepda_co)
  }
};

export function total_octda(params) {
  if (!params.node.group) {
    return create_totalAB(params.data.octda, params.data.octda_co)
  }
};

export function total_novda(params) {
  if (!params.node.group) {
    return create_totalAB(params.data.novda, params.data.novda_co)
  }
};

export function total_decda(params) {
  if (!params.node.group) {
    return create_totalAB(params.data.decda, params.data.decda_co)
  }
};

export function total_mooe_da(params) {
  if (!params.node.group) {
    return create_totalABCD(
      params.getValue('q1da'), params.getValue('q2da'), params.getValue('q3da'), params.getValue('q4da')
    );
  }
}

export function total_co_da(params) {
  if (!params.node.group) {
    return create_totalABCD(
      params.getValue('q1da_co'), params.getValue('q2da_co'), params.getValue('q3da_co'), params.getValue('q4da_co')
    );
  }
}
export function grandtotal_da(params) {
  if (!params.node.group) {
    return create_totalABCD(
      params.getValue('q1da_tota'), params.getValue('q2da_tota'), params.getValue('q3da_tota'), params.getValue('q4da_tota')
    );
  }
}

export function total_q1_mooe_da(params) {
  if (!params.node.group) {
    return create_totalABC(
      params.data.janda,
      params.data.febda,
      params.data.marda
    );
  }
}

export function total_q1_co_da(params) {
  if (!params.node.group) {
    return create_totalABC(
      params.data.janda_co,
      params.data.febda_co,
      params.data.marda_co
    );
  }
}

export function total_q2_mooe_da(params) {
  if (!params.node.group) {
    return create_totalABC(
      params.data.aprda,
      params.data.mayda,
      params.data.junda
    );
  }
}

export function total_q2_co_da(params) {
  if (!params.node.group) {
    return create_totalABC(
      params.data.aprda_co,
      params.data.mayda_co,
      params.data.junda_co
    );
  }
}

export function total_q3_mooe_da(params) {
  if (!params.node.group) {
    return create_totalABC(
      params.data.julda,
      params.data.augda,
      params.data.sepda
    );
  }
}

export function total_q3_co_da(params) {
  if (!params.node.group) {
    return create_totalABC(
      params.data.julda_co,
      params.data.augda_co,
      params.data.sepda_co
    );
  }
}

export function total_q4_mooe_da(params) {
  if (!params.node.group) {
    return create_totalABC(
      params.data.octda,
      params.data.novda,
      params.data.decda
    );
  }
}

export function total_q4_co_da(params) {
  if (!params.node.group) {
    return create_totalABC(
      params.data.octda_co,
      params.data.novda_co,
      params.data.decda_co
    );
  }
}


export function total_da_q1(params) {
  if (!params.node.group) {
    return create_totalABC(
      params.getValue('janda_tota'),
      params.getValue('febda_tota'),
      params.getValue('marda_tota')
    );
  }
}

export function total_da_q2(params) {
  if (!params.node.group) {
    return create_totalABC(
      params.getValue('aprda_tota'),
      params.getValue('mayda_tota'),
      params.getValue('junda_tota')
    );
  }
}

export function total_da_q3(params) {
  if (!params.node.group) {
    return create_totalABC(
      params.getValue('julda_tota'),
      params.getValue('augda_tota'),
      params.getValue('sepda_tota')
    );
  }
}
export function total_da_q4(params) {
  if (!params.node.group) {
    return create_totalABC(
      params.getValue('octda_tota'),
      params.getValue('novda_tota'),
      params.getValue('decda_tota')
    );
  }
}

export function unpaidObligations(params) {
  if (!params.node.group) {
    return create_totalAMinusB(
      params.getValue('grandtotal_fa'),
      params.getValue('grandtotal_da')
  
    );
  }
}

export function disbursementPercentage(params) {
  if (!params.node.group) {
    return create_percentage(
      params.getValue('grandtotal_da'),
      params.getValue('grandtotal_fa')
     
    );
  }
}

export function adjusted_disbursement_view(params) {
  if (!params.node.group) {
    let d = params.data;
    let a = d.janft + d.janft_co + d.febft + d.febft_co+ d.marft + d.marft_co + 
    d.aprft + d.aprft_co + d.mayft + d.mayft_co + d.junft + d.junft_co + 
    d.julft + d.julft_co + d.augft + d.augft_co + d.sepft + d.sepft_co +
    d.octft + d.octft_co + d.novft + d.novft_co + d.decft + d.decft_co;
    let b = d.adjustment + d.adjustment_co 
    return create_totalAB(a, b)
  }
};

///////// EXCEL STYLES

 export var excelStyles = [
  { id: 'indent1', alignment: { indent: 1 }, dataType: 'string' },
  { id: 'indent2', alignment: { indent: 2 }, dataType: 'string' },
  { id: 'indent3', alignment: { indent: 3 }, dataType: 'string' },
  { id: 'indent4', alignment: { indent: 4 }, dataType: 'string' },
  { id: 'indent5', alignment: { indent: 5 }, dataType: 'string' },
  { id: 'bold', font: { bold: true } },
  {
    id: 'data',
    font: { size: 11, fontName: 'Calibri' },
    borders: {
      borderBottom: {
        color: '#000000',
        lineStyle: 'Continuous',
        weight: 1
      },
      borderLeft: { color: '#000000', lineStyle: 'Continuous', weight: 1 },
      borderRight: { color: '#000000', lineStyle: 'Continuous', weight: 1 },
      borderTop: { color: '#000000', lineStyle: 'Continuous', weight: 1 }
    }
  },
  {
    id: 't',
    interior: { color: '#fae091', pattern: 'Solid' },
    font: { size: 11, fontName: 'Calibri', bold: true },
    alignment: { horizontal: 'Center' }
  },
  {
    id: 'a',
    interior: { color: '#a2dde5', pattern: 'Solid' },
    font: { size: 11, fontName: 'Calibri', bold: true },
    alignment: { horizontal: 'Center' }
  },
  {
    id: 'v',
    interior: { color: '#ec9fa7', pattern: 'Solid' },
    font: { size: 11, fontName: 'Calibri', bold: true },
    alignment: { horizontal: 'Center' }
  },
  {
    id: 'month',
    interior: { color: '#e6f403', pattern: 'Solid' },
    font: { size: 11, fontName: 'Calibri', bold: true },
    alignment: { horizontal: 'Center' },
    borders: {
      borderBottom: {
        color: '#000000',
        lineStyle: 'Continuous',
        weight: 1
      },
      borderLeft: { color: '#000000', lineStyle: 'Continuous', weight: 1 },
      borderRight: { color: '#000000', lineStyle: 'Continuous', weight: 1 },
      borderTop: { color: '#000000', lineStyle: 'Continuous', weight: 1 }
    }
  },
  {
    id: 'quarter',
    interior: { color: '#edbae5', pattern: 'Solid' },
    font: { size: 11, fontName: 'Calibri', bold: true },
    alignment: { horizontal: 'Center' },
    borders: {
      borderBottom: {
        color: '#000000',
        lineStyle: 'Continuous',
        weight: 1
      },
      borderLeft: { color: '#000000', lineStyle: 'Continuous', weight: 1 },
      borderRight: { color: '#000000', lineStyle: 'Continuous', weight: 1 },
      borderTop: { color: '#000000', lineStyle: 'Continuous', weight: 1 }
    }
  },
  {
    id: 'p1',
    interior: { color: '#7a6f67', pattern: 'Solid' },
    font: { size: 11, fontName: 'Calibri', bold: true },
    alignment: { horizontal: 'Center' }
  },
  {
    id: 'total',
    interior: { color: '#81f7a6', pattern: 'Solid' },
    font: { size: 11, fontName: 'Calibri', bold: true },
    alignment: { horizontal: 'Center' },
    borders: {
      borderBottom: {
        color: '#000000',
        lineStyle: 'Continuous',
        weight: 1
      },
      borderLeft: { color: '#000000', lineStyle: 'Continuous', weight: 1 },
      borderRight: { color: '#000000', lineStyle: 'Continuous', weight: 1 },
      borderTop: { color: '#000000', lineStyle: 'Continuous', weight: 1 }
    }
  },

  {
    id: 'header',
    font: { size: 11, fontName: 'Calibri', bold: true },
    borders: {
      borderBottom: {
        color: '#000000',
        lineStyle: 'Continuous',
        weight: 1
      },
      borderLeft: { color: '#000000', lineStyle: 'Continuous', weight: 1 },
      borderRight: { color: '#000000', lineStyle: 'Continuous', weight: 1 },
      borderTop: { color: '#000000', lineStyle: 'Continuous', weight: 1 }
    }
  },
  { id: 'headappend', font: { size: 11, fontName: 'Calibri', bold: true } }
];