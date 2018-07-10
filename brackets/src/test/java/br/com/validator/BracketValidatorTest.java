package br.com.validator;

import junit.framework.Test;
import junit.framework.TestCase;
import junit.framework.TestSuite;

/**
 * Unit test for simple App.
 */
public class BracketValidatorTest extends TestCase {
    /**
     * Create the test case
     *
     * @param testName name of the test case
     */
    public BracketValidatorTest( String testName ) {
        super(testName);
    }

    /**
     * @return the suite of tests being tested
     */
    public static Test testValidator() {
    	String input = "()";
    	BracketValidator.check(input);
        return new TestSuite( BracketValidatorTest.class );
    }

    /**
     * Rigourous Test :-)
     */
    public void testApp()
    {
        assertTrue( true );
    }
}
