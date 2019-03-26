#include <cs50.h>
#include <stdio.h>
#include <ctype.h>
#include <string.h>
#include <cs50.h>
#include <stdlib.h>

int main(int argc, string argv[])
{
    int argv_length;
    int plaintext_length;
    if (argc != 2)
    {
        printf ("Usage: ./caesar key\n");
        return 1;
    }
        argv_length = strlen(argv[1]);
	    for (int j = 0; j < argv_length; ++j)
        {
                if (argv[1][j] < 48 || argv[1][j] > 57)
                {    
                    printf("Usage: ./caesar key\n");
                    return 1;
                }
                else
                {
                    string plaintext;
                    plaintext = get_string("plaintext: ");
                    printf("ciphertext: ");
                    plaintext_length = strlen(plaintext);
                    int k = atoi(argv[1]);
                    for (int i = 0; i < plaintext_length; i++)
                    {
                        if (isalpha(plaintext[i]))
                        {    
                            if (isupper(plaintext[i]))
                            {
                                printf("%c", (((plaintext[i] - 65) + k) % 26) + 65);
                            }
                            else
                            {
                                printf("%c", (((plaintext[i] - 97) + k) % 26) + 97);
                            }
                              
                        }
                        else
                            {
                                printf("%c", plaintext[i]);
                            }
                    }
                     printf("\n");
                     return 0;
               }
         } 
}
          

