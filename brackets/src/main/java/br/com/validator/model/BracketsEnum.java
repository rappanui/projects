package br.com.validator.model;

public enum BracketsEnum {

    OPENED_PARENTHESIS('(', true),
    CLOSED_PARENTHESIS(')', false),
    OPENED_KEY_PARENTHESIS('{', true),
    CLOSED_KEY_PARENTHESIS('}', false),
    OPENED_BRACKET_PARENTHESIS('[' , true),
    CLOSED_BRACKET_PARENTHESIS(']', false);

    /** Character value */
    char bracket;

    /** Boolean value for opened brackets */
    boolean openedBracket;

    private BracketsEnum(char bracket, boolean openedBracket){
        this.bracket = bracket;
        this.openedBracket = openedBracket;
    }

    public char getBracket() {
        return bracket;
    }

    public void setBracket(char bracket) {
        this.bracket = bracket;
    }

    public boolean isOpenedBracket() {
        return openedBracket;
    }

    public void setOpenedBracket(boolean openedBracket) {
        this.openedBracket = openedBracket;
    }

}
