using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using static System.Console;

namespace CSharp71Demos {

    public class Animal {
    }

    public class Pig : Animal {
    }

    public class PatternMatchingWithGenerics {

        public static void Cook<T>(T animal) where T : Animal {
            // note the red squiggly!
            // cast is redundant here
            if ((object)animal is Pig pig) {
                // cook and eat it
                Write("We cooked and ate the pig...");
            }

            switch (/*(object)*/animal) {
                case Pig pork:
                    WriteLine(" and it tastes delicious!");
                    break;
            }
        }

        /// <summary>
        /// Need to fall back to C# 7 for this.
        /// </summary>
        public static void MainPMG(string[] args) {
            var pig = new Pig();
            Cook(pig);
        }
    }

}
