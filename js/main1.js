$(document).ready(function() {
    let ai = ""; //for ai
    let user = ""; // for user
    let group = [0, 0, 0, 0, 0, 0, 0, 0, 0];
    //group [1] = ai taken; group [2] = user taken
    $(".choose").fadeIn(3000);
    $("#X").on("click", function() {
        $(".choose").fadeOut();
        user1 = "O";
        user2 = "X";
        userClick1();
    });
    $("#O").on("click", function() {
        $(".choose").fadeOut();
        user1 = "X";
        user2 = "O";
        userClick2();
    });

    let userClick1 = function(i) {
      $("#outside" + i ).on("click", function() {
      // console.log('1');
      let numStep = 0;
      for (let j in group) {
        if (group[j] !== 0) {
        numStep++; // it means ai has already done
        }
      }
      if (numStep % 2 === 0) {
        return; //nothing happend
      }
      if (group[i - 1] === 0) {
        group[i - 1] = 2;
        $("#inside" + i ).html(user);
        judge();
      }
      });//for click
    }; //for userClick function
    for (let i = 1; i <= 9; i++) {
        userClick1(i);
    }

    let userClick2 = function(i) {
      $("#outside" + i ).on("click", function() {
      // console.log('1');
      let numStep = 0;
      for (let j in group) {
        if (group[j] !== 0) {
        numStep++; // it means ai has already done
        }
      }
      if (numStep % 2 !== 0) {
        return; //nothing happend
      }
      if (group[i - 1] === 0) {
        group[i - 1] = 1;
        $("#inside" + i ).html(ai);
        judge();
      }
      });//for click
    }; //for userClick function
    for (let i = 1; i <= 9; i++) {
        userClick2(i);
    }
//testThree function to check whether can make three;
    const testThree = function(player, group) {
        let array = []; //record the postion that can make three
        let allPossible = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6]
        ]; //8 ways to testThree
        for (let i in allPossible) {
            let x = allPossible[i][0];
            let y = allPossible[i][1];
            let z = allPossible[i][2];
            if ((group[x] === player && group[y] === player && group[z] === 0) || (group[x] === 0 && group[y] === player && group[z] === player) || (group[x] === player && group[y] === 0 && group[z] === player)) {
            // like 110 220 011 022 101 202 situation
                if (group[x] === 0) {
                    array.push(x);
                } else if (group[y] === 0) {
                    array.push(y);
                } else if (group[z] === 0) {
                    array.push(z);
                }
            }
        }
        return array;//the postion can make three [x or y or z]
    };
// result
    let result = function(state) {
        if (state === 1) {
            console.log('lose');
            $(".loser").html("LOSE!");
        } else if (state === 2) {
            console.log('WIN');
            $(".loser").html("WIN!");

        } else if (state === 3) {
            console.log('draw');
            $(".loser").html("Draw!");
        }
        setTimeout(function() {
            $(".loser").fadeIn(200, function() {
                setTimeout(function() {
                    beginAgain();
                }, 1000);
            });
        }, 1000);
    };
    //beginAgain
    let beginAgain = function() {
        for (let reset = 0; reset < 9; reset++) {
            group[reset] = 0;
            $("#inside" + (reset + 1)).html("");
        }
        $(".loser").fadeOut(1, function() {
            aiFucntion();
        });

    }
    //judge the condition
    let judge = function() {
        if (group[0] === group[1] && group[1] === group[2] && group[0] !== 0) {
            result(group[0]);
            // [0,1,2]
        } else if (group[3] === group[4] && group[4] === group[5] && group[3] !== 0) {
            result(group[3]);
            //[3,4,5]
        } else if (group[6] === group[7] && group[7] === group[8] && group[6] !== 0) {
            result(group[6]);
            //[6,7,8]
        } else if (group[0] === group[3] && group[3] === group[6] && group[0] !== 0) {
            result(group[0]);
            //[0,3,6]
        } else if (group[1] === group[4] && group[4] === group[7] && group[1] !== 0) {
            result(group[1]);
            //[1,4,7]
        } else if (group[2] === group[5] && group[5] === group[8] && group[2] !== 0) {
            result(group[2]);
            //[2,5,8]
        } else if (group[0] === group[4] && group[4] === group[8] && group[0] !== 0) {
            result(group[0]);
            //[0,4,8]
        } else if (group[2] === group[4] && group[4] === group[6] && group[2] !== 0) {
            result(group[2]);
            //[2,4,6]
        } else {
            //draw
            let isTie = true;
            for (let i = 0; i < 9; i++) {
                if (group[i] === 0) {
                    isTie = false;
                }
            }
            //draw is true
            if (isTie) {
                result(3);
            } else {
                let numStep = 0;
                for (let i in group) {
                    if (group[i] !== 0) {
                        numStep++;
                    }
                }
                if (numStep % 2 === 0 && numStep !== 0) {
                    aiFucntion();
                }
            }
        }
    };
});
