# MatrixType #
**LaTeX for the lazy linear algebrician...!**

Do you hate LaTeX? So do I. That's why I made this horrible script that parses matrices into LaTeX array envs! Simply clone the repository, install the script, and do magic!

```
$ git clone https://github.com/phantamanta44/MatrixType.git
$ cd MatrixType
$ sudo npm install -g
$ matype input.mtype output.tex
```

## Usage ##
To use MatrixType, you'll run it from the command line, like so:
```
$ matype [input] [output]
```
If run without any parameters, MatrixType will accept input from stdin and print to stdout. If an input file is supplied, it'll be read from instead of stdin. Similarly, if an output file is specified, it'll be written to instead of stdout. For example, suppose we have the following `test.mtype` file:
```
[1, a, a^2 | 0
 1, b, b^2 | 0
 1, c, c^2 | 0] * [x
                   y
                   z] = [1
                         2
                         3];
```
Yes, the equation doesn't really make much sense. But that doesn't matter, because what we're trying to demonstrate here is what this looks like when compiled to LaTeX. With a quick run of MatrixType, we get this:
```latex
\left[
\begin{array}{ccc|c}
1 & a & a^2 & 0\\
1 & b & b^2 & 0\\
1 & c & c^2 & 0
\end{array}
\right] \times \left[
\begin{array}{c}
x\\
y\\
z
\end{array}
\right] = \left[
\begin{array}{c}
1\\
2\\
3
\end{array}
\right]\\

```
Significantly more ugly, but at least your math professor will accept it. This is what it looks like when rendered:
![Sample rendering](https://raw.githubusercontent.com/phantamanta44/MatrixType/master/sample.png)