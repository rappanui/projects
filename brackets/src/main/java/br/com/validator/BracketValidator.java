package br.com.validator;

import java.util.ArrayDeque;
import java.util.Collections;
import java.util.Queue;

import br.com.validator.util.ValidationRules;

/**
 * This is a validation class that receives a String input of bracket characters
 * and check if the sequence of those brackets is a valid sequence
 *
 * @author Raphael Silva
 *
 */
public class BracketValidator {

    private static final String VALID_SEQUENCE = "Input has a valid bracket sequence";
    private static final String INVALID_SEQUENCE = "Input has a invalid bracket sequence";
    private static final String INVALID_INPUT = "Input is not valid";

    public static void main(String[] args) {
        String finalMessage;
        String input = args.toString();
        boolean result = false;

        if(!ValidationRules.isValidInput(input)){
            finalMessage = INVALID_INPUT;
        } else {
            result = BracketValidator.check(input);
            finalMessage = result == true ? VALID_SEQUENCE : INVALID_SEQUENCE;
        }

        System.out.println(finalMessage);
    }

    /**
     * Check if the input string is a valid bracket sequence
     *
     * @param String input
     * @return boolean result
     */
    static boolean check(String input) {

        Queue<Character> lifoQueue = Collections.asLifoQueue(new ArrayDeque<Character>());

        for(int i=0;i<input.length();i++) {
            Character bracket = input.charAt(i);

            if(ValidationRules.checkOpenedBracket(bracket)) {
                lifoQueue.add(bracket);
            } else if (ValidationRules.getEquivalentBracket(bracket).equals(lifoQueue.peek())){
                lifoQueue.poll();
            } else {
                return false;
            }
        }

        return lifoQueue.isEmpty();
    }

}