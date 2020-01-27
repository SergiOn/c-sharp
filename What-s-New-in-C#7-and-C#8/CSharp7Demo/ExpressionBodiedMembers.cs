using System;
using System.Collections.Generic;
using static System.Console;

namespace CSharp7Demo {

    public class ExpressionBodiedMembers {

        private int id;

        private static readonly Dictionary<int, string> names = new Dictionary<int, string>();

        public ExpressionBodiedMembers(int id, string name) => names.Add(id, name);
        ~ExpressionBodiedMembers() => names.Remove(id);

        public string Name {
            get => names[id];
            set => names[id] = value;
        }

        public void Write() {
            WriteLine(string.Join(",", names));
            WriteLine(id);
        }

        public static void MainEBM(string[] args) {
            ExpressionBodiedMembers expressionBodiedMembers = new ExpressionBodiedMembers(1, "My Name");
            // ExpressionBodiedMembers expressionBodiedMembers = new ExpressionBodiedMembers(0, "My Name");
            expressionBodiedMembers.Write();
            // WriteLine(expressionBodiedMembers.Name);
        }

    }

}
