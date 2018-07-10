package br.com.validator.util;

import br.com.validator.model.BracketsEnum;

public class ValidationRules {

    /**
     * Invalid input for validation check
     */
    private static final Character NON_VALID_CHARACTER = 'X';

    /**
     * Check if the input is a opened bracket
     *
     * @param bracket
     * @return boolean result
     */
    public static Boolean checkOpenedBracket(char bracket){
        for(BracketsEnum brackets : BracketsEnum.values()){
            if(bracket == brackets.getBracket()){
                return brackets.isOpenedBracket();
            }
        }
        return null;
    }

    /**
     * Check if the input is valid
     *
     * @param bracket
     * @return boolean result
     */
    public static Boolean isValidInput(String input){
        boolean result = false;

        for(Character inputChar : input.toCharArray()) {
            result = false;
            for(BracketsEnum brackets : BracketsEnum.values()){
                if(inputChar == brackets.getBracket()){
                    result = true;
                }
            }
            if (result == false) {
                break;
            }
        }
        return result;
    }

    /**
     * Returns the equivalent bracket for the input
     *
     * @param bracket
     * @return character
     */
    public static Character getEquivalentBracket(char bracket){
        Character equivalentBracket = NON_VALID_CHARACTER;

        for(BracketsEnum brackets : BracketsEnum.values()){
            if(bracket == brackets.getBracket()) {

                if (brackets.equals(BracketsEnum.CLOSED_PARENTHESIS)) {
                    equivalentBracket = BracketsEnum.OPENED_PARENTHESIS.getBracket();
                } else if (brackets.equals(BracketsEnum.CLOSED_KEY_PARENTHESIS)) {
                    equivalentBracket = BracketsEnum.OPENED_KEY_PARENTHESIS.getBracket();
                } else if (brackets.equals(BracketsEnum.CLOSED_BRACKET_PARENTHESIS)) {
                    equivalentBracket = BracketsEnum.OPENED_BRACKET_PARENTHESIS.getBracket();
                }
            }
        }
        return equivalentBracket;
    }

}
