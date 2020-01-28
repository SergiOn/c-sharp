namespace CSharp72Demos {

    public class NonTrailingNamedArguments {

        static void doSomething(int foo, int bar) {
        }

        public static void MainNTNA(string[] args) {
            doSomething(foo: 33, 44);

            // still illegal
            //doSomething(33, foo:44)
        }

    }

}
