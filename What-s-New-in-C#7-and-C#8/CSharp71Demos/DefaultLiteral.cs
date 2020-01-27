using System;
using System.Collections.Generic;
using static System.Console;

namespace CSharp71Demos {

    public class DefaultLiteral {

        // allowed in argument names
        // only upside: switching from ref to value type

        // VS Action 'Simplify Default Expression'
        public DateTime GetTimestamps(List<int> items = default(List<int>)) {
            // ...
            return default;
        }

        /// <summary>
        /// Default literal, one of the slightly meaningless features.
        /// </summary>
        public static void MainDL() {
            // Simplify default expression here
            int a = default(int);
            WriteLine(a);

            int b = default;
            WriteLine(b);

            // constants are ok if the inferred type is suitable
            const int c = default;
            WriteLine(c);

            // will not work here
            // const int? d = default; // oops

            // cannot leave defaults on their own
            var e = new[] {default, 33, default};
            WriteLine(string.Join(",", e));

            // rather silly way of doing things; null is shorter
            string s = default;
            WriteLine(s == null);

            // comparison with default is OK if type can be inferred
            if (s == default) {
                WriteLine("Yes, s is default/null");
            }

            // ternary operations
            var x = a > 0 ? default : 1.5;
            WriteLine(x.GetType().Name);
        }

    }

}
